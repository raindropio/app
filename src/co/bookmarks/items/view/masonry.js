import s from './masonry.module.styl'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getCoverSize } from '~data/selectors/bookmarks'
import itemCoverSize from '~co/bookmarks/item/cover/size'

export default function BookmarksItemsMasonry({ className='',  children }) {
    const coverSize = useSelector(state=>getCoverSize(state, 'masonry'))
    const style = useMemo(()=>({
        '--grid-item-width': itemCoverSize('grid', coverSize).width+'px'
    }), [coverSize])

    return (
        <div 
            className={s.masonry+' '+className}
            style={style}>
            {children}
        </div>
    )
}