import s from './index.module.styl'
import React from 'react'
import { Portal } from 'react-portal'
import { Helmet } from 'react-helmet'
import { eventOrder } from '~modules/browser'

import Context from './context'
import Header from './header'
import Content from './content'

export default class Modal extends React.Component {
    static defaultProps = {
        closable: true,
        important: false,       //over everything else and prevent mousedown bubbling (popovers unclosable)
        hidden: false,          //hide modal visually without unmounting
        onClose: undefined      //func, required
    }

    body = React.createRef()

    componentDidMount() {
        if (!this.props.hidden)
            this.addListeners()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.hidden !== this.props.hidden) {
            if (this.props.hidden)
                this.removeListeners()
            else
                this.addListeners()
        }
    }

    componentWillUnmount() {
        this.removeListeners()
    }

    addListeners() {
        eventOrder.add(this)
        window.addEventListener('keydown', this.onWindowKeyDown)
        window.addEventListener('mousedown', this.onWindowMouseDown, true)
    }

    removeListeners() {
        eventOrder.delete(this)
        window.removeEventListener('keydown', this.onWindowKeyDown)
        window.removeEventListener('mousedown', this.onWindowMouseDown, true)
    }

    onWindowKeyDown = e=>{
        switch(e.key) {
            case 'Escape':
                if (!eventOrder.isLast(this))
                    return

                e.preventDefault()
                e.stopPropagation()
                this.props.onClose()
            break
        }
    }

    onWindowMouseDown = e => {
        if (!this.body.current?.contains(e.target)){
            //prevent clicking outside when important true
            if (this.props.important){
                e.preventDefault()
                e.stopPropagation()
            }
            else if (this.props.closable)
                this.props.onClose()
        }
    }

    render() {
        const { as='div', children, onClose, closable, important, hidden, stretch, className='', ...etc } = this.props
        const Component = as

        return (
            <Portal>
                <Context.Provider value={{ onClose, closable }}>
                    {!hidden && (
                        <Helmet defer={false}>
                            <html data-modal-showing data-modal-stretch={stretch} />
                        </Helmet>
                    )}

                    <div
                        className={s.modal+' '+(important ? s.important : '')+(hidden ? ' '+s.hidden : '')}>
                        <Component 
                            className={s.wrap+' '+className}
                            data-stretch={stretch}
                            {...etc}>
                            <div 
                                ref={this.body}
                                className={s.body} 
                                role='dialog'>
                                {children}
                            </div>
                        </Component>
                    </div>
                </Context.Provider>
            </Portal>
        )
    }
}

export {
    Header,
    Content
}