import s from './confirm.module.styl'
import React from 'react'
import t from '~t'
import Modal, { Content } from '~co/overlay/modal'
import Button from '~co/common/button'
import { Layout, Title } from '~co/common/form'

export default function DialogConfirmView({ id, message, description, ok, cancel, variant, sendResult }) {
    return (
        <Modal 
            className={s.confirm}
            important={true}
            onClose={()=>sendResult(id, false)}>
            <Content>
                <Layout>
                    <Title>{variant=='warning'?'⚠':''} {message}</Title>
                    <div className={s.description}>{description}</div>

                    <Button
                        as='button'
                        data-block
                        autoFocus
                        variant='primary'
                        value='OK'
                        onClick={()=>sendResult(id, true)}>
                        {ok || 'OK'}
                    </Button>

                    <Button 
                        data-block
                        variant='outline'
                        onClick={()=>sendResult(id, false)}>
                        {cancel || t.s('cancel')}
                    </Button>
                </Layout>
            </Content>
        </Modal>
    )
}