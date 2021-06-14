import s from './loading.module.styl'
import React from 'react'
import Modal, { Content } from '~co/overlay/modal'
import Preloader from '~co/common/preloader'

export default function DialogLoading() {
    return (
        <Modal 
            important
            className={s.loading}>
            <Content className={s.content}>
                <Preloader />
            </Content>
        </Modal>
    )
}