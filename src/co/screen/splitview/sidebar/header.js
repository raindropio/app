import React from 'react'
import { Context } from '../'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SplitViewSidebarHeader extends React.Component {
    static contextType = Context

    render() {
        return (
            <header>
                <div className='headerWrap'>
                    {this.props.title && <div className='sidebarHeaderTitle'>
                        {this.props.title}
                    </div>}

                    {this.props.children}

                    <Button variant='flat' onClick={this.context.sidebar.toggle}>
                        <Icon name='close' />
                    </Button>
                </div>
            </header>
        )
    }
}

export default SplitViewSidebarHeader