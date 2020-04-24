import React from 'react'
import { withSplitView } from '../'
import Icon from '~co/common/icon'

class SplitViewSidebarHeader extends React.Component {
    render() {
        return (
            <header>
                <div className='headerWrap'>
                    {this.props.title && <div className='sidebarHeaderTitle'>
                        {this.props.title}
                    </div>}

                    {this.props.children}

                    <a href='' className='button default show-on-extension' onClick={this.props.sidebar.toggle}>
                        <Icon name='close' />
                    </a>
                </div>
            </header>
        )
    }
}

export default withSplitView(SplitViewSidebarHeader)