import React from 'react'
import { usePositioner, useResizeObserver, useMasonry } from 'masonic'
import withAutoSize from './helpers/withAutoSize'
import withContainer from './helpers/withContainer'

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

        scrollTop: 0,
        isScrolling: false
    }

    //items
    getItems = ()=>{
        let i = 0
        return Array.from(Array(this.props.totalCount), () => ({id: i++}))
    }
    
    state = {
        items: this.getItems()
    }

    componentDidUpdate(prev) {
        if (prev.totalCount === this.props.totalCount &&
            prev.dataKey === this.props.dataKey)
            return

        this.setState({ items: this.getItems() })
    }

    //rendering
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
        const { footer, totalCount, empty, ...etc } = this.props
        const columnCount = parseInt(this.props.width / this.props.columnWidth) <= 1 ? 2 : undefined

        return (
            <>
                {(!totalCount && empty) ? empty() : (
                    <VirtualMasonryInner 
                        {...etc}
                        {...this.state}
                        columnCount={columnCount}
                        itemKey={this.itemKey}
                        renderItem={this.renderItem}
                        onRender={this.onRender} />
                )}
                
                {footer && footer()}
            </>
        )
    }
}

const VirtualMasonryInner = ({ width, height, scrollTop, isScrolling, columnWidth, columnCount, items, renderItem, itemKey, defaultItemHeight, onRender, dataKey }) => {
    const positioner = usePositioner({ width, columnCount, columnWidth })
    const resizeObserver = useResizeObserver(positioner)
  
    return useMasonry({
        positioner,
        resizeObserver,

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

export default withAutoSize(withContainer(VirtualMasonry), 'masonry')