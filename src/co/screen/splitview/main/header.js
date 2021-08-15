import React from 'react'
import { Context } from '../'

import Header, { FirstAction } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SplitViewMainHeader extends React.Component {
    static contextType = Context

    render() {
        const { children, ...etc } = this.props
        
        return (
            <Header 
                data-no-shadow
                data-mac-inset
                {...etc}
                className='svMainHeader'>
                <FirstAction className='svSidebarShowButton'>
                    <Button href='' onClick={this.context?.sidebar?.toggle}>
                        <Icon name='menu' />
                    </Button>
                </FirstAction>

                {children}
            </Header>
        )
    }
}

export default SplitViewMainHeader