import React from 'react'
import t from '~t'
import { Context } from '../'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SplitViewReaderHeader extends React.Component {
    static defaultProps = {
        onBackClick: undefined,
        onFullscreenClick: undefined
    }
    
    static contextType = Context

    onBackClick = (e)=>{
        e.preventDefault()
        this.props.onBackClick && this.props.onBackClick()
    }

    onFullscreenClick = (e)=>{
        e.preventDefault()
        this.props.onFullscreenClick && this.props.onFullscreenClick()
    }

    render() {
        return (
            <header>
                <div className='headerWrap'>
                    <Button onClick={this.onBackClick}>
                        <Icon name='back' />
                    </Button>

                    <Button href='' onClick={this.onFullscreenClick} variant={this.context.reader.fullscreen ? 'link' : ''} className={'hide-on-extension hide-on-clipper'} title={t.s('fullscreen')}>
                        <Icon name={'fullscreen'+(this.context.reader.fullscreen ? '_active' : '')} />
                    </Button>

                    {this.props.title && <div className='sidebarHeaderTitle'>
                        {this.props.title}
                    </div>}

                    {this.props.children}
                </div>
            </header>
        )
    }
}

export default SplitViewReaderHeader