import React from 'react'
import t from '~t'
import Context from './context'

import Header, { Title, Space, LastAction } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class ModalHeader extends React.Component {
    static contextType = Context

    render() {
        const { title, children, ...etc } = this.props

        return (
            <Header {...etc}>
                {title && <Title>
                    {title}
                </Title>}

                <Space />

                {children}

                {this.context.closable ? (
                    <LastAction>
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