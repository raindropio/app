import React from 'react'
import { usePositioner, useResizeObserver, useMasonry } from 'masonic'
import withAutoSize from './helpers/withAutoSize'

const emptyObj = {}
const emptyArr = []

export default class VirtualMasonry extends React.Component {
    static defaultProps = {
        className: '', //optional
        columnWidth: 0, //required
        item: undefined, //required
        computeItemKey: undefined, //required
        totalCount: 0, //required
        endReached: undefined //optional
    }

    generateItems = ()=>{
        if (!this.props.totalCount)
            return emptyArr

        return Array.from(Array(this.props.totalCount), () => emptyObj)
    }

    state = {
        items: this.generateItems()
    }

    componentDidUpdate(prev) {
        if (prev.totalCount != this.props.totalCount)
            this.setState({ items: this.generateItems() })
    }

    renderItem = ({ index })=>
        this.props.item(index)

    itemKey = (data, index)=>
        this.props.computeItemKey(index)

    onRender = (startIndex, endIndex)=>{
        if (endIndex >= this.props.totalCount - 3)
            this.props.endReached()
    }

    render() {
        const { items } = this.state

        return (
            <MyMasonry
                {...this.props}
                items={items}
                render={this.renderItem}
                itemKey={this.itemKey}
                onRender={this.onRender}
                overscanBy={5} />
        )
    }
}

const MyMasonry = withAutoSize(
    function({ width, height, scrollTop, isScrolling, columnWidth, columnGutter, dataKey, ...props }) {
        const positioner = usePositioner({ width, columnWidth, columnGutter }, [ dataKey ])
        const resizeObserver = useResizeObserver(positioner)
    
        return useMasonry({
            ...props,
            positioner,
            resizeObserver,
            height,
            scrollTop,
            isScrolling,
        })
    }
)