import React from 'react'
import { withSplitView } from '../'
import Icon from '~co/common/icon'

class SplitViewMainHeader extends React.Component {
    render() {
        return (
            <header className='no-border'>
                <div className='headerWrap'>
                    <span className='button-toggle-sidebar button-toggle-sidebar-autowidth'>
                        <a href='' className='button default' onClick={this.props.sidebar.toggle}>
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

export default withSplitView(SplitViewMainHeader)