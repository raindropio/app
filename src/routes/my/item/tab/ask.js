import s from './ask.module.styl'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import * as bookmarkActions from '~data/actions/bookmarks'

import Stella from '~co/stella'

export default function PageMyItemTabAsk({ item, cId }) {
    const dispatch = useDispatch()

    const onToolCalled = useCallback(() => {
        dispatch(bookmarkActions.oneLoad(item._id))
        dispatch(bookmarkActions.refresh(cId))
    }, [dispatch, item._id, cId])
    
    return (
        <Stella
            raindropId={item._id}
            className={s.embed}
            onToolCalled={onToolCalled}
        />
    )
}