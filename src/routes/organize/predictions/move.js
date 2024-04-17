import s from './style.module.styl'
import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { patch } from '~data/actions/predictions'
import { makeCollectionPath } from '~data/selectors/collections'

import Picker from '~co/collections/picker'
import AccentColor from '~co/collections/item/accentColor'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import RaindropsList from './raindrops-list'
import CollectionIcon from '~co/collections/item/icon'

function Destination({ _id, collectionRef }) {
    const dispatch = useDispatch()
    const [pick, showPick] = useState(false)

    const getCollectionPath = useMemo(()=>makeCollectionPath(), [])
    const path = useSelector(state=>getCollectionPath(state, collectionRef, { self: true }))

    const pickerEvents = useMemo(()=>({
        onItemClick: (c)=>{
            dispatch(patch({ _id, collectionRef: c._id }));
            showPick(false)
        }
    }), [showPick, dispatch])

    return (
        <header>
            <h4>
                Move to <a className={s.destination} href='' onClick={e=>{e.preventDefault(); showPick(true)}}>
                    <CollectionIcon {...path[0]} className={s.icon} />
                    <span className={s.path}>
                        {path.length ? path.map(({ title })=><span>{title}</span>) : 'Select collection'}
                    </span>&nbsp;<Icon name='arrow' size='micro' />
                </a>
            </h4>
            
            {collectionRef ? (
                <Button variant='primary' className={s.accentButton}>
                    &nbsp;Move&nbsp;
                </Button>
            ) : null}

            {pick && (
                <Picker 
                    activeId={collectionRef}
                    events={pickerEvents}
                    onClose={()=>showPick(false)} />
            )}
        </header>
    )
}

export default function MyOrganizePredictionsMove({ prediction: { _id, collectionRef, raindropRefs } }) {
    return (
        <AccentColor _id={collectionRef} force>{style=>
            <div className={s.prediction+' '+(style['--accent-color'] ? s.colored : '')} style={style}>
                <Destination _id={_id} collectionRef={collectionRef} />
                <RaindropsList raindropRefs={raindropRefs} />
            </div>
        }</AccentColor>
    )
}