import React from 'react'
import Modal, { Header } from '~co/overlay/modal'

export default function DialogAlertView({ id, message, sendResult }) {
    return (
        <Modal important={true} onClose={()=>sendResult(id)}>
            <Header title={message} />
        </Modal>
    )
}