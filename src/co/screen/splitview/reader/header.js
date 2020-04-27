import React from 'react'
import t from '~t'
import { Context } from '../'
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
                    <a href='' className='button' onClick={this.onBackClick}>
                        <Icon name='back' />
                    </a>

                    <a href='' onClick={this.onFullscreenClick} className={'button hide-on-extension hide-on-clipper '+(this.context.reader.fullscreen ? 'active' : '')} title={t.s('fullscreen')}>
                        <Icon name={'fullscreen'+(this.context.reader.fullscreen ? '_active' : '')} />
                    </a>

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