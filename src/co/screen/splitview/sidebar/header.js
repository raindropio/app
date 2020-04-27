import React from 'react'
import { Context } from '../'
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

                    <a href='' className='button default show-on-extension' onClick={this.context.sidebar.toggle}>
                        <Icon name='close' />
                    </a>
                </div>
            </header>
        )
    }
}

export default SplitViewSidebarHeader