import React from 'react'
import t from '~t'
import getThumbUri from '~data/modules/format/thumb'

import Icon from '~co/common/icon'
import Modal, { Header, Content } from '~co/overlay/modal'
import PickerSource from '~co/picker/source/popover'

export default class PickerImage extends React.Component {
    static defaultProps = {
        items: [], //[{ link }]
        onLink: undefined, //async
        onFile: undefined, //async
        onScreenshot: undefined, //async
        onClose: undefined
    }

    state = {
        add: false
    }

    handlers = {
        onLink: async(link)=>{
            await this.props.onLink(link)
            this.props.onClose()
        },

        onFile: async(file)=>{
            await this.props.onFile(file)
            this.props.onClose()
        }
    }

    onAddClick = (e)=>{
        e.preventDefault()
        this.setState({ add: true })
    }

    onAddClose = ()=>
        this.setState({ add: false })

    onScreenshotClick = async(e)=>{
        e.preventDefault()

        await this.props.onScreenshot()
        this.props.onClose()
    }

    renderItem = ({ link })=>
        <a 
            key={link}
            href=''
            className='item'
            onClick={(e)=>{ e.preventDefault(); this.handlers.onLink(link) }}>
            <img 
                src={`${getThumbUri(link)}&mode=crop&width=128&height=96&dpr=${window.devicePixelRatio||1}`}
                loading='lazy' />
        </a>

    render() {
        const { items, onClose } = this.props
        const screenshotExists = items.some(({screenshot})=>screenshot)

        return (
            <Modal className='image-picker' onClose={onClose}>
                <Header title={t.s('cover')} />

                <Content data-indent>
                    <div className='items'>
                        {items.map(this.renderItem)}

                        {!screenshotExists ? (
                            <a 
                                href=''
                                className='item'
                                title={t.s('clickToMakeScreenshot')}
                                onClick={this.onScreenshotClick}>
                                <Icon name='web' />
                            </a>
                        ) : null}

                        <a 
                            href=''
                            className='item'
                            title={t.s('coverUpload')}
                            onClick={this.onAddClick}>
                            <Icon name='add' />
                        </a>

                        {this.state.add ? (
                            <PickerSource 
                                {...this.handlers}
                                onClose={this.onAddClose} />
                        ) : null}
                    </div>
                </Content>
            </Modal>
        )
    }
}