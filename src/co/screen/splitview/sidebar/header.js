import React from 'react'
import { Context } from '../'

import Header from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SplitViewSidebarHeader extends React.Component {
    static contextType = Context

    render() {
        return (
            <Header data-flat>
                {this.props.children}

                <Button onClick={this.context.sidebar.toggle}>
                    <Icon name='close' />
                </Button>
            </Header>
        )
    }
}

export default SplitViewSidebarHeader