import s from './style.module.styl'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import Cover from '~co/bookmarks/item/cover'
import { ShortDate } from '~modules/format/date'

function CollectionName({ id }) {
    const getCollection = useMemo(()=>makeCollection(), [])
    const collection = useSelector(state=>getCollection(state, id))
    return collection.title
}

function Render({ raindropRefs }) {
    return raindropRefs.map(({ _id, title, domain, tags, link, cover, created, collectionId })=>(
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

            <a href={link} target='_blank' rel='noopener noreferrer'></a>
        </div>
    ))
}

export default function MyOrganizePredictionsRaindropsList({ raindropRefs }) {
    const first = raindropRefs.slice(0, 3)
    const other = raindropRefs.slice(3)

    return (<>
        <div className={s.raindrops}>
            <Render raindropRefs={first} />
        </div>

        {other.length ? (<details>
            <summary>And {other.length} other bookmarks</summary>
            <div className={s.raindrops}>
                <Render raindropRefs={other} />
            </div>
        </details>) : null}
    </>)
}