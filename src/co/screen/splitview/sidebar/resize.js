import s from './resize.module.styl'
import React from 'react'
import { Context } from '../'

export default class SplitViewSidebarResize extends React.Component {
    static contextType = Context

    onMouseDown = ()=>{
        document.documentElement.classList.add(s.resizeMode)
        window.addEventListener('mouseup', this.onMouseUp)
        window.addEventListener('mousemove', this.onMouseMove)
    }

    onMouseUp = ()=>{
        document.documentElement.classList.remove(s.resizeMode)
        window.removeEventListener('mouseup', this.onMouseUp)
        window.removeEventListener('mousemove', this.onMouseMove)
    }

    onMouseMove = ({ pageX })=>{
        if (pageX < 100)
            this.context.sidebar.close()
        else
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