import React from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'

export default class NewCoverContent extends React.Component {
    componentDidMount(){
        this.updateScroll()
    }

    componentDidUpdate(prevProps) {
        if (this.props.children != prevProps.children)
            this.updateScroll()
    }

    updateScroll = ()=>{
        const pos = localStorage.getItem(`newCover_scroll_${this.props.id}`)

        if (pos){
            const wrap = ReactDom.findDOMNode(this.refs.content)
            wrap.scrollTop = parseInt(pos)
        }
    }

    persistScroll = _.throttle((pos)=>{
        localStorage.setItem(`newCover_scroll_${this.props.id}`, pos)
    }, 300)
    
    onScroll = (e)=>this.persistScroll(e.target.scrollTop)

    render() {
        return (
            <div className='nc-content' ref='content' onScroll={this.onScroll}>
                {this.props.children}
            </div>
        )
    }
}