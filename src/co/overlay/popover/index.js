import s from './index.module.styl'
import React from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import Context from './context'

//save mouse position
let _mousePos = { x:-1, y:-1 }
document.body.addEventListener('mousedown', function(e){
    _mousePos = { x: e.pageX, y: e.pageY }
})

class Popover extends React.Component {
    static defaultProps = {
        pin: undefined,         //react ref
        closable: true,
        hidden: false,
        onClose: undefined      //func, required
    }

    _container = React.createRef()

    initPos = { x:-1, y:-1 }

    store = {
        close: ()=>{
            this.props.onClose()
        }
    }
    
    componentDidMount() {
        this._resizeObserver = new ResizeObserver(this.updatePosition)
        this._resizeObserver.observe(this._container.current)

        window.addEventListener('resize', this.updatePosition)
        window.addEventListener('keydown', this.onWindowKeyDown)
        document.body.addEventListener('mousedown', this.onBodyMouseDown)
    }

    componentWillUnmount() {
        if (this._resizeObserver){
            if (this._container.current)
                this._resizeObserver.unobserve(this._container.current)
            this._resizeObserver.disconnect()
        }

        window.removeEventListener('resize', this.updatePosition)
        window.removeEventListener('keydown', this.onWindowKeyDown)
        document.body.removeEventListener('mousedown', this.onBodyMouseDown)
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

    onWindowKeyDown = (e)=>{
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
                const { left, top, height } = this.props.pin.current.getBoundingClientRect()
                this.initPos.y = top + height
                this.initPos.x = left
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
    }

    render() {
        const { className='', children, closable, pin, theme, ...etc } = this.props

        return (
            <Portal>
                <Context.Provider value={this.store}>
                    <div
                        {...etc}
                        ref={this._container}
                        className={className+' '+s.body}
                        data-closable={closable}
                        data-theme={theme}>
                        {children}
                    </div>
                </Context.Provider>
            </Portal>
        )
    }
}

export default connect(
    state=>({
        theme: state.local.theme
    })
)(Popover)

export * from './menu'