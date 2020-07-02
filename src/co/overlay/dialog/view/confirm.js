import s from './confirm.module.styl'
import React from 'react'
import t from '~t'
import Modal, { Header, Content } from '~co/overlay/modal'
import Button from '~co/common/button'
import { Buttons } from '~co/common/form'

export default function DialogConfirmView({ id, message, sendResult }) {
    return (
        <Modal 
            className={s.confirm}
            important={true}
            onClose={()=>sendResult(id, false)}>
            <Header title={message} />

            <Content data-indent>
                <Buttons>
                    <Button
                        Tag='button'
                        autoFocus
                        variant='primary'
                        data-block
                        value='OK'
                        onClick={()=>sendResult(id, true)}>
                        OK
                    </Button>

                    <Button 
                        variant='outline'
                        data-block
                        onClick={()=>sendResult(id, false)}>
                        {t.s('cancel')}
                    </Button>
                </Buttons>
            </Content>
        </Modal>
    )
}