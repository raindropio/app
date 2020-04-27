import React from 'react'
import { Context } from '../'
import Icon from '~co/common/icon'

class SplitViewMainHeader extends React.Component {
    static contextType = Context

    render() {
        return (
            <header className='no-border'>
                <div className='headerWrap'>
                    <span className='button-toggle-sidebar button-toggle-sidebar-autowidth'>
                        <a href='' className='button default' onClick={this.context.sidebar.toggle}>
                            <Icon name='menu' />
                        </a>
                    </span>

                    {this.props.title && <div className='sidebarHeaderTitle'>
                        {this.props.title}
                    </div>}

                    {this.props.children}
                </div>
            </header>
        )
    }
}

export default SplitViewMainHeader