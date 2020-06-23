import React from 'react'
import { Context } from '../'

import Button from '~co/common/button'
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

                    <Button href='' onClick={this.onCloseClick}>
                        <Icon name='close' />
                    </Button>
                </div>
            </header>
        )
    }
}

export default SplitViewPanelHeader