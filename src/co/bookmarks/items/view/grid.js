import s from './grid.module.styl'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getCoverSize } from '~data/selectors/bookmarks'
import itemCoverSize from '~co/bookmarks/item/cover/size'

export default function BookmarksItemsGrid({ className='', children }) {
    const coverSize = useSelector(state=>getCoverSize(state, 'grid'))
    const style = useMemo(()=>({
        '--grid-item-width': itemCoverSize('grid', coverSize).width+'px'
    }), [coverSize])

    return (
        <div 
            className={s.grid+' '+className}
            style={style}>
            {children}
        </div>
    )
}