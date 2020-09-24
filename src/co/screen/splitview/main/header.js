import React from 'react'
import { Context } from '../'

import Header, { FirstAction } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SplitViewMainHeader extends React.Component {
    static contextType = Context

    render() {
        return (
            <Header 
                data-no-shadow
                className='svMainHeader'>
                <FirstAction className='svSidebarShowButton'>
                    <Button href='' onClick={this.context.sidebar.toggle}>
                        <Icon name='menu' />
                    </Button>
                </FirstAction>

                {this.props.children}
            </Header>
        )
    }
}

export default SplitViewMainHeader