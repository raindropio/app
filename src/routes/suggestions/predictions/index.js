import s from './style.module.styl'
import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as collectionsActions from '~data/actions/collections'
import * as predictionsActions from '~data/actions/predictions'

import Preloader from '~co/common/preloader'
import Move from './move'
import Tag from './tag'
import Mergetags from './mergetags'
import Empty from './empty'
import { Error } from '~co/overlay/dialog'

export default function MySuggestionsPredictions() {
    const dispatch = useDispatch()
    
    //selectors
    const predictions = useSelector(state=>state.predictions.items)
    const status = useSelector(state=>state.predictions.status)
    const apply_status = useSelector(state=>state.predictions.apply_status)
    const count = useSelector(state=>state.predictions.items.length)

    //load
    useEffect(()=>{
        dispatch(predictionsActions.load())
        dispatch(collectionsActions.load())
    }, [dispatch])

    //events
    const onUpdate = useCallback(({ _id, ...changes })=>
        dispatch(predictionsActions.patch({ ...changes, _id })),
        [dispatch]
    )

    const onApply = useCallback(_id=>
        dispatch(predictionsActions.apply(_id, null, Error)),
        [dispatch]
    )

    if (count)
        return (
            <div className={s.listing}>
                {predictions.map(prediction=>{
                    let Component = null
                    switch (prediction.kind) {
                        case 'move': Component = Move; break
                        case 'tag': Component = Tag; break
                        case 'mergetags': Component = Mergetags; break
                    }

                    if (Component)
                        return (
                            <Component 
                                key={prediction._id}
                                prediction={prediction}
                                status={apply_status[prediction._id]}
                                onUpdate={onUpdate}
                                onApply={onApply} />
                        )
                        
                    return null
                })}
            </div>
        )

    if (status == 'loading')
        return <Preloader enlarge='1.5' />

    return <Empty />
}