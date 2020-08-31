import s from './index.module.styl'
import React from 'react'
import { Portal } from 'react-portal'

import Context from './context'
import Header from './header'
import Content from './content'

export default class Modal extends React.Component {
    static defaultProps = {
        closable: true,
        important: false,       //over everything else and prevent mousedown bubbling (popovers unclosable)
        onClose: undefined      //func, required
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onWindowKeyDown)
        window.addEventListener('mousedown', this.onWindowMouseDown, true)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onWindowKeyDown)
        window.removeEventListener('mousedown', this.onWindowMouseDown, true)
    }

    onWindowKeyDown = e=>{
        switch(e.key) {
            case 'Escape':
                e.stopPropagation()
                this.props.onClose()
            break
        }
    }

    onWindowMouseDown = e => {
        if (this.props.important){
            e.preventDefault()
            e.stopPropagation()
        }
    }

    render() {
        const { as='div', children, onClose, closable, important, className='', pin, ...etc } = this.props
        const Component = as

        return (
            <Portal>
                <Context.Provider value={{ onClose, closable }}>
                    <div 
                        className={s.modal+' '+(important ? s.important : '')}>
                        <Component 
                            className={s.wrap+' '+className}
                            {...etc}>
                            <div className={s.body} role='dialog'>
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