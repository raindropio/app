import s from './index.module.styl'
import React from 'react'
import t from '~t'
import getThumbUri from '~data/modules/format/thumb'

import Icon from '~co/common/icon'
import Modal, { Header, Content } from '~co/overlay/modal'
import PickerSource from '~co/picker/source/popover'
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

    pinAdd = React.createRef()

    state = {
        add: false,
        screenshot_loading: false
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

    onAddClick = ()=>
        this.setState({ add: true })

    onAddClose = ()=>
        this.setState({ add: false })

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
            onClick={()=>this.handlers.onLink(link)}>
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

                        <button 
                            ref={this.pinAdd}
                            className={s.item}
                            title={t.s('coverUpload')}
                            onClick={this.onAddClick}>
                            <Icon name='add' />
                        </button>

                        {this.state.add ? (
                            <PickerSource 
                                {...this.handlers}
                                pin={this.pinAdd}
                                onClose={this.onAddClose} />
                        ) : null}
                    </div>
                </Content>
            </Modal>
        )
    }
}