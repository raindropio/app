import React from 'react'
import { Virtuoso } from 'react-virtuoso'

const mainStyle = { width: '100%', height: '100%' }

export default class VirtualList extends React.PureComponent {
    static defaultProps = {
        className: '',              //
        item: undefined,            //required
        computeItemKey: undefined,  //required
        totalCount: 0,              //required
        header: undefined,          //required
        empty: undefined,           //
        endReached: undefined,      //
        stickyHeader: false,
    }

    rangeChanged = ({ endIndex })=>{
        if (endIndex >= this.props.totalCount - 20)
            this.props.endReached()
    }

    renderItem = index=>{
        const { header, item, empty, totalCount } = this.props
        
        if (index == 0)
            return (
                <div key='header'>
                    {header()}
                </div>
            )

        if (!totalCount)
            return (
                <div key='empty'>
                    {empty && empty()}
                </div>
            )

        return item(index-1)
    }

    computeItemKey = index=>{
        const { totalCount, computeItemKey } = this.props
        if (index == 0) return 'header'
        if (!totalCount) return 'empty'
        return computeItemKey(index-1)
    }

    render() {
        const { endReached, totalCount, stickyHeader, ...etc } = this.props

        return (
            <Virtuoso
                {...etc}
                topItems={stickyHeader ? 1 : 0}
                totalCount={totalCount ? totalCount+1 : 2}
                item={this.renderItem}
                computeItemKey={this.computeItemKey}
                defaultItemHeight={80}
                style={mainStyle}
                rangeChanged={endReached && this.rangeChanged}
            />
        )
    }
}