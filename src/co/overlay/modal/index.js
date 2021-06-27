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
        onClose: undefined      //func, required
    }

    body = React.createRef()

    componentDidMount() {
        eventOrder.add(this)

        window.addEventListener('keydown', this.onWindowKeyDown)
        window.addEventListener('mousedown', this.onWindowMouseDown, true)
    }

    componentWillUnmount() {
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
        //prevent clicking outside when important true
        if (this.props.important &&
            !this.body.current.contains(e.target)){
            e.preventDefault()
            e.stopPropagation()
        }
    }

    render() {
        const { as='div', children, onClose, closable, important, stretch, className='', ...etc } = this.props
        const Component = as

        return (
            <Portal>
                <Context.Provider value={{ onClose, closable }}>
                    <Helmet>
                        <html data-modal-showing data-modal-stretch={stretch} />
                    </Helmet>

                    <div 
                        className={s.modal+' '+(important ? s.important : '')}>
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