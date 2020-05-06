import React from 'react'
import { Virtuoso } from 'react-virtuoso'

const mainStyle = { width: '100%', height: '100%' }

export default class VirtualGrid extends React.Component {
    static defaultProps = {
        className: '', //optional
        columns: 1, //optional
        item: undefined, //required
        computeItemKey: undefined, //required
        totalCount: 0, //required
    }

    calculateRows = ()=>
        Math.ceil(this.props.totalCount / this.props.columns)

    renderRow = row=>{
        const { className, columns, item, computeItemKey } = this.props

        const items = []
        for(var column=0; column<columns; column++){
            const index = row*columns + column
            if (computeItemKey(index))
                items.push(item(index))
        }

        return (
            <div className={className}>
                {items}
            </div>
        )
    }

    rangeChanged = ({ endIndex })=>{
        if (endIndex >= this.calculateRows() - 3)
            this.props.endReached()
    }

    render() {
        const { endReached, ...etc } = this.props

        return (
            <Virtuoso
                {...etc}
                className={undefined}
                style={mainStyle}
                item={this.renderRow}
                totalCount={this.calculateRows()}
                rangeChanged={endReached && this.rangeChanged}
            />
        )
    }
}