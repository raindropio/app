import s from './index.module.styl'
import React from 'react'
import t from '~t'
import getThumbUri from '~data/modules/format/thumb'

import Modal, { Header, Content } from '~co/overlay/modal'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import PickerFile from '~co/picker/file/element'
import PickerLink from '~co/picker/link'
import Preloader from '~co/common/preloader'

export default class PickerImage extends React.Component {
    static defaultProps = {
        items: [], //[{ link }]
        selected: 0, //index
        onLink: undefined, //async
        onFile: undefined, //async
        onScreenshot: undefined, //async
        onClose: undefined
    }

    addLink = React.createRef()

    state = {
        addLink: false,
        screenshot_loading: false
    }

    onAddLinkClick = ()=>
        this.setState({ addLink: true })

    onAddLinkClose = ()=>
        this.setState({ addLink: false })

    onLink = async(link)=>{
        await this.props.onLink(link)
        this.props.onClose()
    }

    onFile = async(file)=>{
        await this.props.onFile(file)
        this.props.onClose()
    }

    onScreenshotClick = async()=>{
        if (this.state.screenshot_loading)
            return

        this.setState({ screenshot_loading: true })
        await this.props.onScreenshot()
        this.setState({ screenshot_loading: false })

        this.props.onClose()
    }

    renderItem = ({ link }, index)=>
        <button 
            key={link}
            className={s.item}
            autoFocus={this.props.selected == index}
            onClick={()=>this.onLink(link)}>
            <img 
                src={`${getThumbUri(link)}?mode=crop&width=128&height=96&dpr=${window.devicePixelRatio||1}`}
                loading='lazy' />
        </button>

    render() {
        const { items, onClose } = this.props
        const { screenshot_loading } = this.state
        const screenshotExists = items.some(({screenshot})=>screenshot)

        return (
            <Modal onClose={onClose}>
                <Header title={t.s('cover')} data-no-shadow>
                    <Button 
                        ref={this.addLink}
                        variant='link'
                        title={t.s('add')+' URL…'}
                        onClick={this.onAddLinkClick}>
                        <Icon name='add' />
                    </Button>

                    <Button
                        as='label'
                        variant='link'
                        title={`${t.s('upload')} ${t.s('file').toLowerCase()}…`}>
                        <PickerFile onFile={this.onFile}>
                            <Icon name='upload' />
                        </PickerFile>
                    </Button>
                </Header>

                <Content>
                    <div className={s.items}>
                        {items.map(this.renderItem)}

                        {!screenshotExists ? (
                            <Button 
                                className={s.item}
                                title={t.s('clickToMakeScreenshot')}
                                onClick={this.onScreenshotClick}>
                                {screenshot_loading ? <Preloader /> : t.s('screenshot')}
                            </Button>
                        ) : null}

                        {this.state.addLink ? (
                            <PickerLink 
                                pin={this.addLink}
                                onClose={this.onAddLinkClose}
                                onLink={this.onLink} />
                        ) : null}
                    </div>
                </Content>
            </Modal>
        )
    }
}