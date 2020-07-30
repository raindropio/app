import s from './sortable.module.styl'
import React from 'react'
import { ReactSortable } from 'react-sortablejs'
import Base from './base'

export default class VirtuosoListWithDnd extends React.Component {
    static defaultProps = {
        //...same as ./base
        type: undefined,            //
        rowIsDraggable: undefined,  //func, optional (index)
        onDragEnd: undefined,       //func (fromIndex,toIndex)
    }

    renderListContainer = container=>(
        <ListContainer
            {...this.props}
            container={container} />
    )
    
    render() {
        return (
            <Base
                {...this.props}
                ListContainer={this.renderListContainer} />
        )
    }
}

class ListContainer extends React.Component {
    state = {
        items: []
    }

    static getDerivedStateFromProps({ totalCount, footer, computeItemKey }) {
        return {
            items: Array.from(Array(totalCount + (footer?1:0)), (_,index) => ({
                id: computeItemKey(index)
            }))
        }
    }

    setItems = items =>
        this.setState({ items })

    onEnd = ({ oldIndex, newIndex })=>{
        this.props.onDragEnd(oldIndex, newIndex)
    }

    render() {
        const { container: { listRef, children, ...etc } } = this.props
        const { type } = this.props
        const { items } = this.state
        
        return (
            <div ref={listRef}>
                <ReactSortable
                    {...etc}
                    className={s.sortable}
                    ghostClass={s.ghost}
                    group={type}

                    animation={150}
                    delay={100}
                    delayOnTouchOnly={true}
                    scroll={false}
                    
                    filter='footer'
                    list={items}
                    setList={this.setItems}

                    onEnd={this.onEnd}>
                    {children}
                </ReactSortable>
            </div>
        )
    }
}