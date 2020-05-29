import React from 'react'
import { Portal } from 'react-portal'
import Context from './context'

//save mouse position
let _mousePos = { x:-1, y:-1 }
document.body.addEventListener('mousemove', function(e){
    _mousePos = { x: e.pageX, y: e.pageY }
})

//last popover position
let _lastPos = { x:-1, y:-1 }

export default class Popover extends React.Component {
    static defaultProps = {
        closable: true,
        hidden: false,
        onClose: undefined      //func, required
    }

    _container = React.createRef()

    initPos = _lastPos //when popover called from another popover, it's useful to show it on the same pos as previous

    store = {
        close: ()=>{
            this.props.onClose()
        }
    }
    
    componentDidMount() {
        this._resizeObserver = new ResizeObserver(this.updatePosition)
        this._resizeObserver.observe(this._container.current)

        window.addEventListener('resize', this.updatePosition)
        document.body.addEventListener('mousedown', this.onBodyMouseDown)
        document.body.addEventListener('keydown', this.onBodyKeyDown)
    }

    componentWillUnmount() {
        _lastPos = {x:-1, y:-1}

        if (this._resizeObserver){
            if (this._container.current)
                this._resizeObserver.unobserve(this._container.current)
            this._resizeObserver.disconnect()
        }

        window.removeEventListener('resize', this.updatePosition)
        document.body.removeEventListener('mousedown', this.onBodyMouseDown)
        document.body.removeEventListener('keydown', this.onBodyKeyDown)
    }

    //click outside
    onBodyMouseDown = (e)=>{
        if (!this.props.closable)
            return
        
        const { clientX, clientY } = e
        const { offsetWidth, offsetHeight } = this._container.current
        const { left, top } = this._container.current.getBoundingClientRect()
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
        if (this.initPos.x==-1) {
            this.initPos = {}

            //use current mouse position
            this.initPos.y = _mousePos.y
            this.initPos.x = _mousePos.x

            //pin to active element, if it over mouse pos
            try{
                const { left, top, width, height } = document.activeElement.getBoundingClientRect()
                if (width < 200 && height < 200){
                    if (top < this.initPos.y && top + height >= this.initPos.y)
                        this.initPos.y = top + height

                    if (left < this.initPos.x && left + width >= this.initPos.x)
                        this.initPos.x = left
                }
            }catch(e){}
        }

        let { y, x } = this.initPos

        //prevent showing outside of viewport
        const { innerWidth, innerHeight } = window
        const { offsetWidth, offsetHeight } = this._container.current

        if (x + offsetWidth > innerWidth)
            x = innerWidth - offsetWidth - 10
        if (x < 0)
            x = 10

        if (y + offsetHeight > innerHeight)
            y = innerHeight - offsetHeight - 10
        if (y < 0)
            y = 10

        this._container.current.setAttribute('style', `top: ${y}px; left: ${x}px;`)

        //save to global variable
        _lastPos = { y, x }
    }

    render() {
        return (
            <Portal>
                <Context.Provider value={this.store}>
                    <div
                        ref={this._container}
                        hidden={this.props.hidden}
                        className='pop-body'>
                        {this.props.children}
                    </div>
                </Context.Provider>
            </Portal>
        )
    }
}

export * from './menu'