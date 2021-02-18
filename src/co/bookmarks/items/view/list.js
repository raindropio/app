import s from './list.module.styl'
import React from 'react'
import { useSelector } from 'react-redux'

export default function BookmarksItemsList({ className='', children }) {
    const listCoverRight = useSelector(state=>state.config.raindrops_list_cover_right)

    return (
        <div className={`${s.list} ${listCoverRight && 'list-cover-right'} ${className}`}>
            {children}
        </div>
    )
}