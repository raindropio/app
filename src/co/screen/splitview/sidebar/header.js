import s from './header.module.styl'
import React from 'react'
import { Context } from '../'

import Header, { FirstAction } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SplitViewSidebarHeader extends React.Component {
    static contextType = Context

    render() {
        return (
            <Header 
                data-no-shadow
                className={s.header}>
                <FirstAction className='svSidebarCloseButton'>
                    <Button onClick={this.context.sidebar.toggle}>
                        <Icon name='close' />
                    </Button>
                </FirstAction>

                <div className={s.space} />

                {this.props.children}
            </Header>
        )
    }
}

export default SplitViewSidebarHeader