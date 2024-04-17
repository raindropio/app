import s from './style.module.styl'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Button from '~co/common/button'

function Destination({ _id }) {
    const dispatch = useDispatch()

    return (
        <header>
            <h4>Simplify tags</h4>
            
            <Button variant='primary'>
                &nbsp;Apply&nbsp;
            </Button>
        </header>
    )
}

export default function MyOrganizePredictionsMergetags({ prediction: { _id, tags } }) {
    return (
        <div className={s.prediction}>
            <Destination _id={_id} />

            <ul>
                {tags.map(([original, ...dups])=>(
                    <li key={original}>
                        Replace {dups.map(tag=><><s key={tag}>#{tag}</s>, </>)} with <b>#{original}</b>
                    </li>
                ))}
            </ul>
        </div>
    )
}