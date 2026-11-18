import s from './ask.module.styl'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import * as bookmarkActions from '~data/actions/bookmarks'
import useSpaceCacheId from '../../useSpaceCacheId'

import Stella from '~co/stella'

export default function PageMyItemTabAsk({ item, cId, search }) {
    const dispatch = useDispatch()
    const spaceId = useSpaceCacheId(cId, search)

    const onToolCalled = useCallback(() => {
        dispatch(bookmarkActions.oneLoad(item._id))
        dispatch(bookmarkActions.refresh(spaceId))
    }, [dispatch, item._id, spaceId])
    
    return (
        <Stella
            raindropId={item._id}
            className={s.embed}
            onToolCalled={onToolCalled}
        />
    )
}