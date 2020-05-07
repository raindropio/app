import React from 'react'
import Masonry from 'react-masonry-css'
import withAutoSize from './helpers/withAutoSize'

class VirtualMasonry extends React.Component {
    static defaultProps = {
        className: '', //optional
        columnWidth: 0, //required
        item: undefined, //required
        totalCount: 0, //required
        endReached: undefined //optional
    }

    //columns count
    measure = ()=>{
        const { width, columnWidth } = this.props
        const columnCount = parseInt(width / columnWidth)

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
        
        if (scrollTop > scrollHeight-height*2)
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
        const { className } = this.props

        return (
            <Masonry 
                breakpointCols={columnCount}
                className={className}
                columnClassName=''
                onScroll={this.onContainerScroll}>
                {this.renderItems()}
            </Masonry>
        )
    }
}

export default withAutoSize(VirtualMasonry)