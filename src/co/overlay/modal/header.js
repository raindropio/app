import s from './header.module.styl'
import React from 'react'
import Context from './context'
import Icon from '~co/common/icon'

class ModalHeader extends React.Component {
    static contextType = Context

    render() {
        return (
            <header className={s.header}>
                {this.props.title && <div className={s.title}>
                    {this.props.title}
                </div>}

                {this.props.children}

                {this.context.closable ? (
                    <a className={'button default '+s.close} onClick={this.context.onClose}>
                        <Icon name='close' />
                    </a>
                ) : null}
            </header>
        )
    }
}

export default ModalHeader