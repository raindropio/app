import s from './style.module.styl'
import t from '~t'
import React, { useState, useMemo, useCallback, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { makeCollectionPath } from '~data/selectors/collections'

import Picker from '~co/collections/picker'
import AccentColor from '~co/collections/item/accentColor'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import RaindropsList from './raindrops-list'
import CollectionIcon from '~co/collections/item/icon'

function Destination({ prediction: { _id, collectionRef }, onUpdate, onApply }) {
    const [pick, showPick] = useState(false)

    const getCollectionPath = useMemo(()=>makeCollectionPath(), [])
    const path = useSelector(state=>getCollectionPath(state, collectionRef, { self: true }))

    const pickerEvents = useMemo(()=>({
        onItemClick: c=>{
            onUpdate({ _id, collectionRef: c._id })
            showPick(false)
        }
    }), [showPick, onUpdate])
    const onApplyClick = useCallback(()=>onApply(_id), [_id])

    return (
        <header>
            <h4>
                {t.s('move')} {t.s('to')} <a className={s.destination} href='' onClick={e=>{e.preventDefault(); showPick(true)}}>
                    {/*path.length ? (
                        <CollectionIcon {...path[path.length-1]} className={s.icon} />
                    ) : null*/}
                    
                    <span className={s.path}>
                        {path.length ? path.map(({ title })=><span key={title}>{title}</span>) : 'Select collection'}
                    </span>&nbsp;<Icon name='arrow' size='micro' />
                </a>
            </h4>
            
            {collectionRef ? (
                <Button as='button' variant='primary' data-shape='pill' className={s.accentButton} onClick={onApplyClick}>
                    <Icon name='ai' size='micro' /> {t.s('move')}
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

export default forwardRef(function MyOrganizePredictionsMove({ prediction, onUpdate, onApply }, ref) {
    return (
        <AccentColor _id={prediction.collectionRef} force>{style=>
            <div ref={ref} className={s.prediction+' '+(style['--accent-color'] ? s.colored : '')} style={style}>
                <Destination prediction={prediction} onUpdate={onUpdate} onApply={onApply} />
                <RaindropsList prediction={prediction} onUpdate={onUpdate} />
            </div>
        }</AccentColor>
    )
})