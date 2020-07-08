import s from './index.module.styl'
import React from 'react'
import _ from 'lodash'
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
        scaleDown: false,
        onClose: undefined      //func, required
    }

    _container = React.createRef()

    initPos = { x:-1, y:-1 }

    store = {
        close: ()=>{
            this.props.onClose && this.props.onClose()
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

    componentDidUpdate(prev) {
        if (prev.children != this.props.children)
            this.updatePosition()
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

    updatePosition = _.debounce(()=>{
        if (!this._container.current) return

        this.initPos = {}

        //use current mouse position
        this.initPos.y = _mousePos.y
        this.initPos.x = _mousePos.x

        //pin to active element
        try{
            const { left, top, height } = this.props.pin.current.getBoundingClientRect()
            this.initPos.y = top + height
            this.initPos.x = left
        }catch(e){}

        let { y, x } = this.initPos

        //prevent showing outside of viewport
        const { innerWidth, innerHeight } = window
        const { offsetWidth, offsetHeight } = this._container.current

        if (x + offsetWidth > innerWidth)
            x = innerWidth - offsetWidth - 16
        if (x < 0)
            x = 16

        if (!this.props.scaleDown && y + offsetHeight > innerHeight)
            y = innerHeight - offsetHeight - 16

        if (y < 0)
            y = 16

        this._container.current.setAttribute('style', `--top: ${parseInt(y)}px; --left: ${parseInt(x)}px;`)
    }, 100, { maxWait: 1000, leading: true })

    render() {
        const { className='', children, closable, scaleDown, pin, dispatch, theme, appSize, innerRef, ...etc } = this.props

        if (innerRef)
            innerRef(this._container)

        return (
            <Portal>
                <Context.Provider value={this.store}>
                    <div 
                        {...etc}
                        ref={this._container}
                        className={className+' '+s.wrap}
                        data-closable={closable}
                        data-scale-down={scaleDown}
                        data-theme={theme}
                        data-app-size={appSize}>
                        <div className={s.body}>
                            {children}
                        </div>
                    </div>
                </Context.Provider>
            </Portal>
        )
    }
}

export default connect(
    state=>({
        theme: state.local.theme,
        appSize: state.local.appSize,
    })
)(Popover)

export * from './menu'