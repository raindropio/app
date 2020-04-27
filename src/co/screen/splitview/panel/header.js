import React from 'react'
import { Context } from '../'
import Icon from '~co/common/icon'

class SplitViewPanelHeader extends React.Component {
    static defaultProps = {
        onCloseClick: undefined
    }
    static contextType = Context

    onCloseClick = (e)=>{
        e.preventDefault()
        this.props.onCloseClick && this.props.onCloseClick()
    }

    render() {
        return (
            <header>
                <div className='headerWrap'>
                    {this.props.title && <div className='sidebarHeaderTitle'>
                        {this.props.title}
                    </div>}

                    {this.props.children}

                    <a href='' className='button' onClick={this.onCloseClick}>
                        <Icon name='close' />
                    </a>
                </div>
            </header>
        )
    }
}

export default SplitViewPanelHeader