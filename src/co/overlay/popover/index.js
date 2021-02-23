import s from './index.module.styl'
import React from 'react'
import _ from 'lodash'
import { Portal } from 'react-portal'
import { Helmet } from 'react-helmet'
import { eventOrder } from '~modules/browser'
import Context from './context'

//save mouse position
let _mousePos = { x:-1, y:-1 }
document.documentElement.addEventListener('mousedown', function(e){
    _mousePos = { x: e.pageX, y: e.pageY }
})

export default class Popover extends React.Component {
    static defaultProps = {
        pin: undefined,         //react ref
        closable: true,
        hidden: false,
        stretch: false,         //should stretch in extension, on web show max content as possible
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
        eventOrder.add(this)

        this.updatePosition()
        if (typeof ResizeObserver != 'undefined'){
            this._resizeObserver = new ResizeObserver(this.updatePosition)

            if (this.props.pin && this.props.pin.current)
                this._resizeObserver.observe(this.props.pin.current)
        }

        window.addEventListener('keydown', this.onWindowKeyDown)
        document.body.addEventListener('mousedown', this.onBodyMouseDown)
    }

    componentWillUnmount() {
        eventOrder.delete(this)

        if (this.props.pin && this.props.pin.current && this._resizeObserver)
            this._resizeObserver.unobserve(this.props.pin.current)

        if (this._resizeObserver)
            this._resizeObserver.disconnect()

        window.removeEventListener('keydown', this.onWindowKeyDown)
        document.body.removeEventListener('mousedown', this.onBodyMouseDown)
    }

    //click outside
    onBodyMouseDown = (e)=>{
        if (!eventOrder.isLast(this)) return
        if (!this.props.closable) return

        if (!this._container.current.contains(e.target))
            this.store.close()
    }

    onWindowKeyDown = (e)=>{
        switch(e.key) {
            case 'Escape':
                if (!eventOrder.isLast(this))
                    return

                e.preventDefault()
                e.stopPropagation()
                return this.store.close()
        }
    }

    onContextMenu = (e) => e.preventDefault()

    updatePosition = _.debounce(()=>{
        if (!this._container.current) return

        this.initPos = {}

        //use current mouse position
        this.initPos.y = _mousePos.y
        this.initPos.x = _mousePos.x

        //pin to active element
        try{
            if (this.props.pin.current){
                const { left, top, height } = this.props.pin.current.getBoundingClientRect()
                this.initPos.y = top + height
                this.initPos.x = left
            }
        }catch(e){}

        let { y, x } = this.initPos

        //prevent showing outside of viewport
        const { innerWidth, innerHeight } = window
        const { offsetWidth, offsetHeight } = this._container.current

        if (x + offsetWidth > innerWidth)
            x = innerWidth - offsetWidth - 16
        if (x < 0)
            x = 16

        if (!this.props.stretch && y + offsetHeight > innerHeight)
            y = innerHeight - offsetHeight - 16

        if (y < 0)
            y = 16

        this._container.current.setAttribute('style', `--top: ${parseInt(y)}px; --left: ${parseInt(x)}px;`)
    }, 100, { leading: true })

    render() {
        const { className='', children, closable, stretch, pin, innerRef, ...etc } = this.props

        if (innerRef)
            innerRef(this._container)

        return (
            <Portal>
                <Context.Provider value={this.store}>
                    {stretch ? (
                        <Helmet>
                            <html data-popover-showing />
                        </Helmet>
                    ) : null}

                    <div 
                        {...etc}
                        ref={this._container}
                        className={className+' '+s.wrap}
                        data-closable={closable}
                        data-stretch={stretch}
                        onContextMenu={this.onContextMenu}>
                        <div className={s.body}>
                            {children}
                        </div>
                    </div>
                </Context.Provider>
            </Portal>
        )
    }
}

export * from './menu'