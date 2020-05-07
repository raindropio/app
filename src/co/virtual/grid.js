import React from 'react'
import _ from 'lodash'
import { Virtuoso } from 'react-virtuoso'

const mainStyle = { width: '100%', height: '100%' }

class VirtualGrid extends React.Component {
    static defaultProps = {
        className: '', //optional
        columnWidth: 0, //required
        item: undefined, //required
        computeItemKey: undefined, //required
        totalCount: 0, //required
    }

    //columns and rows count
    measure = ()=>{
        const { width, columnWidth, totalCount } = this.props
        const columnCount = parseInt(width / columnWidth)

        return {
            columnCount,
            rowCount: Math.ceil(totalCount / columnCount),
            style: {
                ...mainStyle,
                '--grid-columns': columnCount
            }
        }
    }

    state = this.measure()

    componentDidUpdate(prev) {
        if (prev.width == this.props.width &&
            prev.columnWidth == this.props.columnWidth &&
            prev.totalCount == this.props.totalCount)
            return

        const m = this.measure()
        if (m.columnCount != this.state.columnCount ||
            m.rowCount != this.state.rowCount)
            this.setState(m)
    }

    //rendering
    rangeChanged = ({ endIndex })=>{
        if (endIndex >= this.state.rowCount - 3)
            this.props.endReached()
    }

    renderRow = row=>{
        const { columnCount } = this.state
        const { className, item, computeItemKey } = this.props

        const items = []
        for(var column=0; column<columnCount; column++){
            const index = row*columnCount + column
            if (computeItemKey(index))
                items.push(item(index))
        }

        return (
            <div className={className} key={row}>
                {items}
            </div>
        )
    }

    render() {
        const { rowCount, columnCount, style } = this.state
        const { dataKey='', endReached, ...etc } = this.props

        return (
            <Virtuoso
                {...etc}

                className={undefined}
                computeItemKey={undefined}

                style={style}
                item={this.renderRow}

                dataKey={dataKey+columnCount}
                totalCount={rowCount}

                rangeChanged={endReached && this.rangeChanged}
                overscan={500}
            />
        )
    }
}

export default class VirtualGridAutoSize extends React.Component {
    state = {
        width: 0
    }

    bindRef = ref => {
        if (!ref || this._div == ref) return

        this._div = ref
        this._resizeObserver = new ResizeObserver(this.onResize)
        this._resizeObserver.observe(this._div)
    }

    componentWillUnmount() {
        if (this._resizeObserver){
            if (this._div)
                this._resizeObserver.unobserve(this._div)
            this._resizeObserver.disconnect()
        }
    }

    onResize = ([div])=>{
        const { width } = div.contentRect
        this.computeWidth(width)
    }

    computeWidth = _.debounce(width=>{
        if (width != this.state.width)
            this.setState({ width })
    }, 50)

    render() {
        const { width } = this.state

        return (
            <div ref={this.bindRef} style={mainStyle}>
                {width ? <VirtualGrid {...this.props} {...this.state} /> : null}
            </div>
        )
    }
}