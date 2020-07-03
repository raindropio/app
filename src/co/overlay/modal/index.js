import s from './index.module.styl'
import React from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'

import Context from './context'
import Header from './header'
import Content from './content'

class Modal extends React.Component {
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
        const { children, onClose, closable, important, className='', theme, appSize, dispatch, ...etc } = this.props

        return (
            <Portal>
                <Context.Provider value={{ onClose, closable }}>
                    <div 
                        className={s.modal+' '+(important ? s.important : '')}
                        data-theme={theme}
                        data-app-size={appSize}>
                        <div 
                            className={s.wrap+' '+className}
                            {...etc}>
                            <div className={s.body}>
                                {children}
                            </div>
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
)(Modal)

export {
    Header,
    Content
}