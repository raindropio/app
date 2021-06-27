import s from './header.module.styl'
import React from 'react'
import t from '~t'
import Context from './context'

import Header, { Title, Space, FirstAction, LastAction } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class ModalHeader extends React.Component {
    static contextType = Context

    render() {
        const { title, children, ...etc } = this.props

        return (
            <Header {...etc}>
                {this.context.closable ? (
                    <FirstAction className={s.back}>
                        <Button 
                            title={t.s('close')}
                            onClick={this.context.onClose}>
                            <Icon name='back' />
                        </Button>
                    </FirstAction>
                ) : null}

                {title && <Title>
                    {title}
                </Title>}

                <Space />

                {children}

                {this.context.closable ? (
                    <LastAction className={s.close}>
                        <Button 
                            title={t.s('close')}
                            onClick={this.context.onClose}>
                            <Icon name='close' />
                        </Button>
                    </LastAction>
                ) : null}
            </Header>
        )
    }
}

export default ModalHeader