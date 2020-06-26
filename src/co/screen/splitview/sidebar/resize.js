import s from './resize.module.styl'
import React from 'react'
import { Context } from '../'

export default class SplitViewSidebarResize extends React.Component {
    static contextType = Context

    onMouseDown = ()=>{
        this._disableSelect = setTimeout(() => {
            document.body.classList.add(s.disableSelect)
        }, 300)
        window.addEventListener('mouseup', this.onMouseUp)
        window.addEventListener('mousemove', this.onMouseMove)
    }

    onMouseUp = ()=>{
        clearTimeout(this._disableSelect)
        document.body.classList.remove(s.disableSelect)
        window.removeEventListener('mouseup', this.onMouseUp)
        window.removeEventListener('mousemove', this.onMouseMove)
    }

    onMouseMove = ({ pageX })=>{
        this.context.update('sidebar', { width: pageX })
    }

    onDoubleClick = ()=>
        this.onMouseMove({ pageX: 0 })

    render() {
        return (
            <div 
                className='svSidebarResize'
                onDoubleClick={this.onDoubleClick}
                onMouseDown={this.onMouseDown} />
        )
    }
}