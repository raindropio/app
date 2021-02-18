import s from './grid.module.styl'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getGridSize } from '~data/selectors/bookmarks'
import coverSize from '~co/bookmarks/item/cover/size'

export default function BookmarksItemsGrid({ spaceId, className='', children }) {
    const gridSize = useSelector(state=>getGridSize(state, spaceId))
    const style = useMemo(()=>({
        '--grid-item-width': coverSize('grid', gridSize).width+'px'
    }), [gridSize])

    return (
        <div 
            className={s.grid+' '+className}
            style={style}>
            {children}
        </div>
    )
}