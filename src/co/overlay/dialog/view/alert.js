import React from 'react'
import Modal, { Content } from '~co/overlay/modal'
import Button from '~co/common/button'
import { Buttons, Layout, Title } from '~co/common/form'

export default function DialogAlertView({ id, message, ok, variant, sendResult }) {
    return (
        <Modal important={true} onClose={()=>sendResult(id)}>
            <Content>
                <Layout>
                    <Title>{variant=='error'?'🥵':''} {message}</Title>
                    <div/>

                    <Buttons>
                        <Button
                            Tag='button'
                            autoFocus
                            variant='primary'
                            data-block
                            value='OK'
                            onClick={()=>sendResult(id)}>
                            {ok || 'OK'}
                        </Button>
                    </Buttons>
                </Layout>
            </Content>
        </Modal>
    )
}