import s from './index.module.styl'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { highlights as getHighlights } from '~data/selectors/bookmarks'
import { oneLoad } from '~data/actions/bookmarks'

import Screen from '~co/screen/basic'
import Header from './header'
import Highlights from '~co/highlights/items'
import Empty from '../empty'

export default function ExtensionHighlightsScreen() {
    const dispatch = useDispatch()
    const { _id } = useParams()

    const { length: count } = useSelector(state=>getHighlights(state, _id))
    useEffect(()=>dispatch(oneLoad(_id)), [_id])

    if (!count)
        return <Empty />

    return (
        <Screen>
            <Header _id={_id} count={count} />

            <div className={s.items}>
                <Highlights _id={_id} />
            </div>
        </Screen>
    )
}