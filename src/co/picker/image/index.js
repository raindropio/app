import React from 'react'
import t from '~t'
import getThumbUri from '~data/modules/format/thumb'

import Modal, { Header, Content } from '~co/overlay/modal'

export default class PickerImage extends React.Component {
    static defaultProps = {
        items: [] //[{ link }]
    }

    renderItem = ({ link })=>
        <a href='' className='item'>
            <img 
                src={`${getThumbUri(link)}&mode=crop&width=128&height=96&dpr=${window.devicePixelRatio||1}`}
                width='128'
                height='96'
                loading='lazy' />
        </a>

    render() {
        const { items, onClose } = this.props

        return (
            <Modal className='image-picker' onClose={onClose}>
                <Header title={t.s('cover')} />

                <Content data-indent>
                    <div className='items'>
                        {items.map(this.renderItem)}
                    </div>
                </Content>
            </Modal>
        )
    }
}