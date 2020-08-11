import s from './resize.module.styl'
import React from 'react'
import { Context } from '../'

export default class SplitViewSidebarResize extends React.Component {
    static contextType = Context

    onMouseDown = ()=>{
        document.body.classList.add(s.disableSelect)
        window.addEventListener('mouseup', this.onMouseUp)
        window.addEventListener('mousemove', this.onMouseMove)
    }

    onMouseUp = ()=>{
        document.body.classList.remove(s.disableSelect)
        window.removeEventListener('mouseup', this.onMouseUp)
        window.removeEventListener('mousemove', this.onMouseMove)
    }

    onMouseMove = ({ pageX })=>{
        this.context.sidebar.resize(pageX)
    }

    onDoubleClick = ()=>
        this.onMouseMove({ pageX: 0 })

    render() {
        return (
            <div 
                className={s.resize}
                onDoubleClick={this.onDoubleClick}
                onMouseDown={this.onMouseDown} />
        )
    }
}