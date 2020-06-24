import React from 'react'
import Context from './context'

import Header, { Title, Space, LastAction } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class ModalHeader extends React.Component {
    static contextType = Context

    render() {
        return (
            <Header data-flat>
                {this.props.title && <Title>
                    {this.props.title}
                </Title>}

                <Space />

                {this.props.children}

                {this.context.closable ? (
                    <LastAction>
                        <Button onClick={this.context.onClose}>
                            <Icon name='close' />
                        </Button>
                    </LastAction>
                ) : null}
            </Header>
        )
    }
}

export default ModalHeader