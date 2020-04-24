import React from 'react'
import { withSplitView } from '../'
import Icon from '~co/common/icon'

class SplitViewPanelHeader extends React.Component {
    render() {
        return (
            <header>
                <div className='headerWrap'>
                    {this.props.title && <div className='sidebarHeaderTitle'>
                        {this.props.title}
                    </div>}

                    {this.props.children}

                    <a href='' className='button' onClick={this.props.panel.toggle}>
                        <Icon name='close' />
                    </a>
                </div>
            </header>
        )
    }
}

export default withSplitView(SplitViewPanelHeader)