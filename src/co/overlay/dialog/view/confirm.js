import s from './confirm.module.styl'
import React from 'react'
import t from '~t'
import Modal, { Content } from '~co/overlay/modal'
import Button from '~co/common/button'
import { Buttons, Layout, Title } from '~co/common/form'

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

                    <Buttons>
                        <Button
                            as='button'
                            autoFocus
                            variant='primary'
                            data-block
                            value='OK'
                            onClick={()=>sendResult(id, true)}>
                            {ok || 'OK'}
                        </Button>

                        <Button 
                            variant='outline'
                            data-block
                            onClick={()=>sendResult(id, false)}>
                            {cancel || t.s('cancel')}
                        </Button>
                    </Buttons>
                </Layout>
            </Content>
        </Modal>
    )
}