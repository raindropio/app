import s from './index.module.styl'
import React from 'react'
import t from '~t'
import getThumbUri from '~data/modules/format/thumb'

import Icon from '~co/common/icon'
import Modal, { Header, Content } from '~co/overlay/modal'
import Button from '~co/common/button'
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

    pinAddLink = React.createRef()

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
                <Header title={t.s('cover')} />

                <Content>
                    <div className={s.items}>
                        {items.map(this.renderItem)}

                        {!screenshotExists ? (
                            <button 
                                className={s.item}
                                title={t.s('clickToMakeScreenshot')}
                                onClick={this.onScreenshotClick}>
                                {screenshot_loading ? <Preloader /> : t.s('screenshot')}
                            </button>
                        ) : null}

                        <Button 
                            ref={this.pinAddLink}
                            className={s.item}
                            title={t.s('coverUpload')}
                            onClick={this.onAddLinkClick}>
                            <Icon name='add' /> URL
                        </Button>

                        <Button 
                            as='label'
                            className={s.item}
                            title={t.s('coverUpload')}>
                            <PickerFile onFile={this.onFile}>
                                <Icon name='upload' /> {t.s('file')}
                            </PickerFile>
                        </Button>

                        {this.state.addLink ? (
                            <PickerLink 
                                pin={this.pinAddLink}
                                onClose={this.onAddLinkClose}
                                onLink={this.onLink} />
                        ) : null}
                    </div>
                </Content>
            </Modal>
        )
    }
}