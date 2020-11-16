import React from 'react'
import { Link } from 'react-router-dom'
import t from '~t'
import { eventOrder } from '~modules/browser'
import { Context } from '../'

import Header from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class SplitViewReaderHeader extends React.Component {
    static defaultProps = {
        backTo: '',
        onBackClick: undefined,
        onFullscreenClick: undefined
    }
    
    static contextType = Context

    backButton = React.createRef()

    componentDidMount() {
        eventOrder.add(this)
        window.addEventListener('keydown', this.onWindowKeyDown)
    }

    componentWillUnmount() {
        eventOrder.delete(this)
        window.removeEventListener('keydown', this.onWindowKeyDown)
    }

    onWindowKeyDown = e=>{
        switch(e.key) {
            case 'Escape':
                if (!eventOrder.isLast(this))
                    return

                e.preventDefault()
                e.stopPropagation()
                this.backButton.current.click()
            break
        }
    }

    onBackClick = (e)=>{
        if (!e.currentTarget.href) {
            e.preventDefault()
            this.props.onBackClick && this.props.onBackClick()
        }
    }

    onFullscreenClick = (e)=>{
        e.preventDefault()
        this.props.onFullscreenClick && this.props.onFullscreenClick()
    }

    render() {
        return (
            <Header 
                data-no-shadow 
                data-fancy
                data-mac-inset
                className='svReaderHeader'>
                <Button 
                    ref={this.backButton}
                    as={Link}
                    to={this.props.backTo}
                    onClick={this.onBackClick}>
                    <Icon name='close' />
                </Button>

                <Button 
                    href='' 
                    onClick={this.onFullscreenClick} 
                    variant={this.context.reader.fullscreen ? 'link' : ''} 
                    className='svReaderFullscreenButton'
                    title={t.s('fullscreen')}>
                    <Icon name={'fullscreen'+(this.context.reader.fullscreen ? '_active' : '')} />
                </Button>

                {this.props.children}
            </Header>
        )
    }
}

export default SplitViewReaderHeader