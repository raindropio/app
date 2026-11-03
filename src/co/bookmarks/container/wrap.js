import s from './wrap.module.styl'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectMode } from '~data/selectors/bookmarks'
import { removeSelected } from '~data/actions/bookmarks'
import t from '~t'
import { Confirm } from '~co/overlay/dialog'

import AccentColor from '~co/collections/item/accentColor'
import Drop from '../dnd/drop'

export default function BookmarksContainerWrap({ spaceId, children }) {
    const dispatch = useDispatch()
    const getSelectMode = useRef(makeSelectMode()).current
    const selectMode = useSelector(state=>getSelectMode(state, spaceId))
    const pendingRemoval = useRef(null)

    useEffect(()=>()=>{
        pendingRemoval.current = null
    }, [selectMode])

    const onKeyUp = async e=>{
        if (e.key != 'Delete' && e.key != 'Backspace') return
        if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return
        if (!e.target.matches('input[type="checkbox"]')) return
        if (!e.target.checked && !e.target.indeterminate) return
        if (!selectMode.enabled || selectMode.working || (!selectMode.all && !selectMode.ids.length)) return
        if (pendingRemoval.current) return

        e.preventDefault()
        const request = {}
        pendingRemoval.current = request

        try {
            const yes = await Confirm(t.s('areYouSure'), { variant: 'warning' })
            if (yes && pendingRemoval.current === request)
                dispatch(removeSelected(spaceId))
        } finally {
            if (pendingRemoval.current === request)
                pendingRemoval.current = null
        }
    }

    return (
        <AccentColor _id={spaceId}>{style=>
            <Drop spaceId={spaceId}>{({ dropHandlers, isDropping })=>
                <div 
                    className={`${s.wrap} ${isDropping && s.isDropping}`}
                    style={style}
                    onKeyUp={onKeyUp}
                    {...dropHandlers}>
                    {children}
                </div>
            }</Drop>
        }</AccentColor>
    )
}
