import s from './style.module.styl'
import t from '~t'
import React, { useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import { makeItems } from '~data/selectors/bookmarks'

import Cover from '~co/bookmarks/item/cover'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { ShortDate } from '~modules/format/date'

function CollectionName({ id }) {
    const getCollection = useMemo(()=>makeCollection(), [])
    const collection = useSelector(state=>getCollection(state, id))
    return collection.title
}

function Render({ raindrops, onRemove }) {
    return raindrops.map(({ _id, title, domain, tags=[], link, cover, created, collectionId })=>(
        <div key={_id} className={s.raindropItem}>
            <div className={s.cover}>
                <Cover 
                    cover={cover}
                    link={link}
                    domain={domain}
                    view='list' />
            </div>
            
            <div className={s.meta}>
                <div className={s.title}>{title}</div>
                <div className={s.tags}>
                    {tags.map(tag=>`#${tag}`).join(', ')}
                </div>
                <div className={s.info}>
                    <span className={s.path}><CollectionName id={collectionId} /></span> · {domain} · <ShortDate date={created}/>
                </div>
            </div>

            <Button as='button' className={s.remove} onClick={()=>onRemove(_id)}>
                <Icon name='close' size='micro' />
            </Button>

            <a href={link} target='_blank' rel='noopener noreferrer'></a>
        </div>
    ))
}

export default function MyOrganizePredictionsRaindropsList({ prediction: { _id, raindropRefs=[] }, onUpdate }) {
    const getItems = useMemo(()=>makeItems(), [])
    const raindrops = useSelector(state=>getItems(state, raindropRefs))
    const first = useMemo(()=>raindrops.slice(0, 3), [raindrops])
    const other = useMemo(()=>raindrops.slice(3), [raindrops])

    //events
    const onRemove = useCallback(raindropId=>{
        onUpdate({
            _id,
            raindropRefs: raindropRefs.filter(_id=>_id != raindropId)
        })
    }, [onUpdate, _id, raindropRefs])

    return (<>
        <div className={s.raindrops}>
            <Render raindrops={first} onRemove={onRemove} />
        </div>

        {other.length ? (<details>
            <summary>{t.s('und')} {other.length} {t.s('bookmarks')}</summary>
            <div className={s.raindrops}>
                <Render raindrops={other} onRemove={onRemove} />
            </div>
        </details>) : null}
    </>)
}