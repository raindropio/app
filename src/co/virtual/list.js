import React from 'react'
import { Virtuoso } from 'react-virtuoso'

const mainStyle = { width: '100%', height: '100%' }

export default class VirtualList extends React.PureComponent {
    static defaultProps = {
        className: '', //optional
        item: undefined, //required
        computeItemKey: undefined, //required
        totalCount: 0, //required
        endReached: undefined, //optional
    }

    rangeChanged = ({ endIndex })=>{
        if (endIndex >= this.props.totalCount - 20)
            this.props.endReached()
    }

    render() {
        const { endReached, ...etc } = this.props

        return (
            <Virtuoso
                {...etc}
                defaultItemHeight={80}
                style={mainStyle}
                rangeChanged={endReached && this.rangeChanged}
            />
        )
    }
}