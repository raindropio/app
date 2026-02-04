import s from './ask.module.styl'
import React, { useState, useCallback } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import * as bookmarkActions from '~data/actions/bookmarks'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Modal from '~co/overlay/modal'
import Stella from '~co/stella'

export default function PageMySpaceHeaderAsk({ itemId, cId }) {
    const dispatch = useDispatch()
    const [created, setCreated] = useState(false)
    const [visible, setVisible] = useState(false)

    const onOpen = useCallback(e => {
        e.preventDefault()
        setCreated(true)
        setVisible(true)
    }, [])

    const onToolCalled = useCallback(() => {
        dispatch(bookmarkActions.refresh(cId))
    }, [dispatch, cId])

    const onClose = useCallback(() => {
        setVisible(false)
    }, [])

    return (
        <>
            {!itemId && (
                <Button title={t.s('ask')} onClick={onOpen}>
                    <Icon name='ai' />
                    <span className='hide-on-small-body'>{t.s('ask')}</span>
                </Button>
            )}

            {created && (
                <Modal
                    className={s.modal}
                    hidden={!visible}
                    onClose={onClose}>
                    <Stella
                        onToolCalled={onToolCalled}
                        onClose={onClose} />
                </Modal>
            )}
        </>
    )
}
