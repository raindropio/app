import React from 'react'
import { Portal } from 'react-portal'
import Context from './context'

//save mouse position
let _mousePos = { x:-1, y:-1 }
document.body.addEventListener('mousemove', function(e){
    _mousePos = {
        x: e.pageX,
        y: e.pageY
    }
})

export default class Popover extends React.Component {
    static defaultProps = {
        onClose: undefined      //func, required
    }

    _body = React.createRef()

    store = {
        close: ()=>{
            this.props.onClose()
        }
    }
    
    componentDidMount() {
        this.updatePosition()

        document.body.addEventListener('mousedown', this.onBodyMouseDown)
        document.body.addEventListener('keydown', this.onBodyKeyDown)
    }

    componentWillUnmount() {
        document.body.removeEventListener('mousedown', this.onBodyMouseDown)
        document.body.removeEventListener('keydown', this.onBodyKeyDown)
    }

    onBodyMouseDown = (e)=>{
        const { clientX, clientY } = e
        const { offsetWidth, offsetHeight } = this._body.current
        const { left, top } = this._body.current.getBoundingClientRect()
        const mouseOver = ((clientX > left) && (clientX < (left+offsetWidth)) && (clientY > top) && (clientY < (top+offsetHeight)))

        if (!mouseOver)
            this.store.close()
    }

    onBodyKeyDown = (e)=>{
        switch(e.key) {
            case 'Escape':
                e.preventDefault()
                e.stopPropagation()
                return this.store.close()
        }
    }

    updatePosition = ()=>{
        let y = _mousePos.y
        let x = _mousePos.x

        const { innerWidth, innerHeight } = window
        const { offsetWidth, offsetHeight } = this._body.current

        if (x + offsetWidth > innerWidth)
            x = innerWidth - offsetWidth - 16
        if (y + offsetHeight > innerHeight)
            y = innerHeight - offsetHeight - 16

        this._body.current.setAttribute('style', `top: ${y}px; left: ${x}px;`)
    }

    render() {
        return (
            <Portal>
                <Context.Provider value={this.store}>
                    <div
                        ref={this._body}
                        className='pop-body'>
                        {this.props.children}
                    </div>
                </Context.Provider>
            </Portal>
        )
    }
}

export * from './menu'