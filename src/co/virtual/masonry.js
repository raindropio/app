import React from 'react'
import Masonry from 'react-masonry-css'
import withAutoSize from './helpers/withAutoSize'

const mainStyle = { overflowY: 'overlay' }
const stickyHeaderStyle = {position: 'sticky', top:0, zIndex: 99}

class VirtualMasonry extends React.PureComponent {
    static defaultProps = {
        className: '',
        columnWidth: 0,         //required
        item: undefined,        //required
        totalCount: 0,          //required
        endReached: undefined,
        stickyHeader: false,
    }

    scrollToIndex = (to)=>{
        //not implemented
    }

    //columns count
    measure = ()=>{
        const { width, columnWidth } = this.props
        const columnCount = Math.max(parseInt(width / columnWidth), 2)

        return {
            columnCount
        }
    }

    state = this.measure()

    componentDidUpdate(prev) {
        if (prev.width == this.props.width &&
            prev.columnWidth == this.props.columnWidth)
            return

        const m = this.measure()
        if (m.columnCount != this.state.columnCount)
            this.setState(m)
    }

    //infinite scroll
    onContainerScroll = (e)=>{
        const { height, endReached } = this.props
        const { scrollTop, scrollHeight } = e.target
        
        if (scrollTop > scrollHeight-height*3)
            endReached()
    }

    //render
    renderItems = ()=>{
        const { totalCount, item } = this.props
        
        let items = []
        for(var i=0;i<totalCount;i++)
            items.push(item(i))

        return items
    }

    render() {
        const { columnCount } = this.state
        const { className, header, stickyHeader, footer, disableVirtualization } = this.props

        return (
            <>
                <div style={stickyHeader ? stickyHeaderStyle : undefined}>
                    {header && header()}
                </div>

                <Masonry 
                    breakpointCols={columnCount}
                    className={className}
                    columnClassName=''
                    onScroll={this.onContainerScroll}
                    style={disableVirtualization ? undefined : mainStyle}>
                    {this.renderItems()}
                </Masonry>

                {footer && footer()}
            </>
        )
    }
}

export default withAutoSize(VirtualMasonry)