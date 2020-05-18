import React from 'react'
import { Virtuoso } from 'react-virtuoso'

const mainStyle = { width: '100%', height: '100%' }
const stickyHeaderStyle = {position: 'sticky', top:0, zIndex: 99}

export default class VirtualList extends React.PureComponent {
    static defaultProps = {
        className: '',              //
        item: undefined,            //required
        computeItemKey: undefined,  //required
        totalCount: 0,              //required
        header: undefined,          //
        empty: undefined,           //
        endReached: undefined,      //
        stickyHeader: false,
        disableVirtualization: false,
        defaultItemHeight: 80
    }

    rangeChanged = ({ endIndex })=>{
        if (endIndex >= this.props.totalCount - 20)
            this.props.endReached()
    }

    renderItem = index=>{
        const { header, item, empty, totalCount, disableVirtualization } = this.props
        
        if (header && index == 0)
            return (
                <div key='header' style={disableVirtualization ? stickyHeaderStyle : undefined}>
                    {header()}
                </div>
            )

        if (!totalCount)
            return (
                <div key='empty'>
                    {empty && empty()}
                </div>
            )

        return item(index-(header?1:0))
    }

    computeItemKey = index=>{
        const { header, totalCount, computeItemKey } = this.props
        if (header && index == 0) return 'header'
        if (!totalCount) return 'empty'
        return computeItemKey ? computeItemKey(index-(header?1:0)) : index
    }

    render() {
        const { endReached, totalCount, header, stickyHeader, dataKey, disableVirtualization, ...etc } = this.props
        const Component = disableVirtualization ? NonVirtualList : Virtuoso

        return (
            <Component
                {...etc}
                dataKey={dataKey+(!totalCount?'empty':'')}
                topItems={header && stickyHeader ? 1 : 0}
                totalCount={totalCount ? (totalCount+(header?1:0)) : (1+(header?1:0))}
                item={this.renderItem}
                computeItemKey={this.computeItemKey}
                style={mainStyle}
                rangeChanged={endReached && this.rangeChanged}
            />
        )
    }
}

export class NonVirtualList extends React.Component {
    render() {
        const { totalCount, item, className, style, footer } = this.props

        let items = []
        if (totalCount)
            for(var i = 0; i<totalCount; i++)
                items.push(item(i))

        return (
            <div className={className} style={{...style, height: 'auto'}}>
                {items}

                {footer && footer()}
            </div>
        )
    }
}