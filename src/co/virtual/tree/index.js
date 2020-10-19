import s from './index.module.styl'
import React from 'react'
import { FixedSizeList, areEqual } from 'react-window'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import withAutoSize from '../helpers/withAutoSize'

const emptyObject = {}

function getStyle({ draggableProps }, snapshot, source) {
    if (!draggableProps || !draggableProps.style)
        return source.style

    return {
        ...draggableProps.style,
        ...source.style,
    }
}

class VirtuosoTree extends React.Component {
    static defaultProps = {
        //base
        dataKey: '',
        className: '',
        item: undefined,            //required, (index, provided, snapshot)
        totalCount: 0,              //required
        footer: undefined,          //incomplete!
        itemHeight: 0,
        scrollToIndex: -1,

        //rbdnd
        rowIsDraggable: undefined,  //func, optional (index)
        rowIsDroppable: undefined,  //func, optional (fromIndex, toIndex)
        onDragStart: undefined,     //func, optional (index)
        onDragEnd: undefined,       //func (fromIndex,toIndex,action=combine|move)
    }

    _list = React.createRef()

    state = {
        isCombineEnabled: this.props.rowIsDroppable ? true: false
    }

    //common
    componentDidMount() {
        this.scrollToIndex()
    }

    componentDidUpdate(prev) {
        if (prev.scrollToIndex != this.props.scrollToIndex)
            this.scrollToIndex()
    }

    scrollToIndex = ()=>{
        const { scrollToIndex } = this.props
        if (scrollToIndex < 0 || !this._list.current) return
        
        this._list.current.scrollToItem(scrollToIndex)
    }

    //rbdnd specific
    onDragStart = ({ source })=>{
        this.props.onDragStart && this.props.onDragStart(source.index)
    }

    onDragUpdate = ({ source, combine })=>{
        clearTimeout(this._longHover)

        //Enable or disable dropping into items
        let isCombineEnabled = this.props.rowIsDroppable ? true : false
        if (combine && this.props.rowIsDroppable){
            const to = parseInt(combine.draggableId)
            isCombineEnabled = this.props.rowIsDroppable(source.index, to)

            //Long hover
            if (this.props.onLongHover && combine && isCombineEnabled)
                this._longHover = setTimeout(() => {
                    this.props.onLongHover(source.index, to)
                }, 500)
        }

        if (isCombineEnabled != this.state.isCombineEnabled)
            this.setState({ isCombineEnabled })
    }

    onDragEnd = ({ source, destination, combine })=>{
        clearTimeout(this._longHover)

        if (!this.props.onDragEnd) return

        if (combine)
            return this.props.onDragEnd(source.index, parseInt(combine.draggableId), 'combine')
        else if (destination && source.index != destination.index)
            this.props.onDragEnd(source.index, destination.index, 'move')
    }

    renderRow = React.memo(source => {
        //drag disabled
        if (this.props.rowIsDraggable && !this.props.rowIsDraggable(source.index))
            return this.renderClone(undefined, undefined, { source })

        //drag enabled
        return (
            <Draggable
                key={source.index}
                draggableId={String(source.index)}
                index={source.index}>
                {(provided, snapshot)=>
                    this.renderClone(provided, snapshot, { source })
                }
            </Draggable>
        )
    }, areEqual)

    renderClone = (provided=emptyObject, snapshot=emptyObject, { source })=>(
        <div
            key={source.index}
            ref={provided.innerRef}
            {...provided.draggableProps||{}}
            {...provided.dragHandleProps||{}}
            style={getStyle(provided, snapshot, source)}
            onClick={null}>
            {this.props.item(source.index, provided, snapshot)}
        </div>
    )

    render() {
        const { className='', height, totalCount, itemHeight, dataKey } = this.props
        const { isCombineEnabled } = this.state

        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}>
                <Droppable
                    droppableId='default'
                    mode='virtual'
                    isCombineEnabled={isCombineEnabled}
                    renderClone={this.renderClone}>
                    {({ innerRef }) => (
                        <FixedSizeList
                            ref={this._list}
                            outerRef={innerRef}

                            outerElementType={OuterElement}
                            className={s.tree+' '+className}
                            width='100%'
                            height={height}
                            itemCount={totalCount}
                            itemSize={itemHeight}
                            itemData={dataKey}
                            
                            overscanCount={10}>
                            {this.renderRow}
                        </FixedSizeList>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

const OuterElement = React.forwardRef((props, ref) => (
    <div ref={ref} tabIndex={-1} {...props} />
 ));

export default withAutoSize(VirtuosoTree, 'tree')