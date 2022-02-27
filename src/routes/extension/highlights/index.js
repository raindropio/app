import s from './index.module.styl'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { highlights as getHighlights } from '~data/selectors/bookmarks'
import { oneLoad } from '~data/actions/bookmarks'

import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header from './header'
import Highlights from '~co/highlights/items'
import Empty from './empty'

export default function ExtensionHighlightsScreen({ match: { params: { _id } } }) {
    const dispatch = useDispatch()
    const { length: count } = useSelector(state=>getHighlights(state, _id))
    useEffect(()=>dispatch(oneLoad(_id)), [_id])

    return (
        <Protected redirect>
            <Screen>
                <Header count={count} />

                {count ? (
                    <div className={s.items}>
                        <Highlights _id={_id} />
                    </div>
                ) : (
                    <div>
                        <br />
                        <Empty />
                        <br />
                    </div>
                )}
            </Screen>
        </Protected>
    )
}