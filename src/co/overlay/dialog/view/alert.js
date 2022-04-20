import s from './alert.module.styl'
import React from 'react'
import Modal, { Content } from '~co/overlay/modal'
import Button from '~co/common/button'
import { Layout, Title } from '~co/common/form'

export default function DialogAlertView({ id, message, description, ok, variant, sendResult }) {
    return (
        <Modal 
            className={s.alert}
            important={true}
            onClose={()=>sendResult(id)}>
            <Content>
                <Layout>
                    <Title>{variant=='error'?'⛔️':''} {message}</Title>
                    <div className={s.description}>{description}</div>

                    <Button
                        data-block
                        as='button'
                        autoFocus
                        variant='primary'
                        value='OK'
                        onClick={()=>sendResult(id)}>
                        {ok || 'OK'}
                    </Button>
                </Layout>
            </Content>
        </Modal>
    )
}