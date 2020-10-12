import React from 'react'
import { Context } from '../'

import Header, { FirstAction } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SplitViewSidebarHeader extends React.Component {
    static contextType = Context

    render() {
        const { children, ...etc } = this.props

        return (
            <Header 
                {...etc}
                data-no-shadow
                data-mac-inset>
                <FirstAction className='svSidebarCloseButton'>
                    <Button onClick={this.context.sidebar.toggle}>
                        <Icon name='close' />
                    </Button>
                </FirstAction>

                {children}
            </Header>
        )
    }
}

export default SplitViewSidebarHeader