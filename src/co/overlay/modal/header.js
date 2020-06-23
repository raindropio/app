import s from './header.module.styl'
import React from 'react'
import Context from './context'

import Button from '~co/common/button'
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
                    <Button className={s.close} onClick={this.context.onClose}>
                        <Icon name='close' />
                    </Button>
                ) : null}
            </header>
        )
    }
}

export default ModalHeader