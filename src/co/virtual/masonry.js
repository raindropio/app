import React from 'react'
import { usePositioner, useResizeObserver, useMasonry } from 'masonic'
import withAutoSize from './helpers/withAutoSize'

const mainStyle = {width: '100%', height: '100%', overflowY: 'overlay'}

class VirtualMasonry extends React.Component {
    static defaultProps = {
        dataKey: '',
        className: '',
        columnWidth: 0,         //required
        item: undefined,        //required
        totalCount: 0,          //required
        defaultItemHeight: 80,
        endReached: undefined,
        footer: undefined,
        empty: undefined,       //not supported yet!
        scrollToIndex: undefined,//not supported yet!
        computeItemKey: undefined,
        disableVirtualization: false,
    }
    
    containerRef = React.createRef()

    state = {
        scrollTop: 0,
        isScrolling: false
    }

    static getDerivedStateFromProps(props, state) {
        if (state.totalCount === props.totalCount)
            return null
        
        let i=0
        return {
            totalCount: props.totalCount,
            items: Array.from(Array(props.totalCount), () => ({id: i++}))
        }
    }

    onScroll = (e)=>{
        this.setState({ scrollTop: e.target.scrollTop, isScrolling: true }, ()=>{
            clearTimeout(this._scrollStop)
            this._scrollStop = setTimeout(() => {
                this.setState({ isScrolling: false })
            }, 100)
        })
    }

    onRender = (startIndex, endIndex)=>{
        if (endIndex >= this.props.totalCount - (endIndex - startIndex)*2)
            this.props.endReached()
    }

    renderItem = ({ index })=>
        this.props.item(index)

    itemKey = this.props.computeItemKey ?
        (data, index)=>this.props.computeItemKey(index) :
        undefined

    render() {
        const { footer, disableVirtualization, ...etc } = this.props

        let columnCount = parseInt(this.props.width / this.props.columnWidth)

        return (
            <div 
                style={disableVirtualization ? undefined : mainStyle}
                ref={this.containerRef}
                onScroll={this.onScroll}>
                <VirtualMasonryInner 
                    {...etc}
                    {...this.state}
                    columnCount={columnCount <= 1 ? 2 : undefined}
                    itemKey={this.itemKey}
                    renderItem={this.renderItem}
                    onRender={this.onRender} />
                
                {footer && footer()}
            </div>
        )
    }
}

const VirtualMasonryInner = ({ width, height, scrollTop, isScrolling, columnWidth, columnCount, items, renderItem, className, itemKey, defaultItemHeight, onRender, dataKey }) => {
    const positioner = usePositioner({ width, columnCount, columnWidth }, [dataKey])
    const resizeObserver = useResizeObserver(positioner)
  
    return useMasonry({
        positioner,
        resizeObserver,

        className,
        items,
        itemKey,
        render: renderItem,
        itemHeightEstimate: defaultItemHeight,
        onRender,

        height,
        scrollTop,
        isScrolling,

        overscanBy: 2,
        tabIndex: ''
    })
}

export default withAutoSize(VirtualMasonry, 'masonry')