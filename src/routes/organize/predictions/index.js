import s from './style.module.styl'
import React, { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeGroupped } from '~data/selectors/predictions'
import * as predictionsActions from '~data/actions/predictions'

import Preloader from '~co/common/preloader'
import Move from './move'
import Tag from './tag'
import Mergetags from './mergetags'
import Empty from './empty'

export default function MyOrganizePredictions() {
    const dispatch = useDispatch()
    
    //selectors
    const getGroupped = useMemo(makeGroupped, [])
    const groups = useSelector(state=>getGroupped(state))
    const status = useSelector(state=>state.predictions.status)
    const count = useSelector(state=>state.predictions.items.length)

    //load
    useEffect(()=>dispatch(predictionsActions.load()), [])

    if (count)
        return (
            <div className={s.groups}>
                {groups.map(([kind, predictions])=>{
                    let Component = null
                    switch (kind) {
                        case 'move': Component = Move; break
                        case 'tag': Component = Tag; break
                        case 'mergetags': Component = Mergetags; break
                    }

                    if (Component)
                        return (
                            <div key={kind} className={s.listing}>
                                {predictions.map(prediction=>
                                    <Component key={prediction._id} prediction={prediction} />
                                )}
                            </div>
                        )
                        
                    return null
                })}
            </div>
        )

    if (status == 'loading')
        return <Preloader enlarge='1.5' />

    return <Empty />
}