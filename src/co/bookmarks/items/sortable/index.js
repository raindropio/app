import s from './index.module.styl'
import React, { useRef, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import { makeSort, makeSelectModeEnabled } from '~data/selectors/bookmarks'
import { oneReorder } from '~data/actions/bookmarks'

import { ReactSortable } from 'react-sortablejs'

export default function BookmarksItemsSortable({ data, spaceId, children }) {
    const dispatch = useDispatch()

    //collection
    const getCollection = useRef(makeCollection()).current
    const { access } = useSelector(state=>getCollection(state, spaceId))

    //space
    const getSort = useRef(makeSort()).current
    const sort = useSelector(state=>getSort(state, spaceId))

    //select mode
    const getSelectModeEnabled = useRef(makeSelectModeEnabled()).current
    const selectModeEnabled = useSelector(state=>getSelectModeEnabled(state, spaceId))

    //enabled?
    const enabled = (
        sort=='sort' &&
        !selectModeEnabled &&
        access && 
        access.level >= 3
    )

    //required for sortable
    const list = useMemo(
        ()=>enabled ? data.map(id=>({id})) : data, 
        [data, enabled]
    )
    const ignoreFunc = useCallback(()=>{}, [])

    //events
    const onSortEnd = useCallback(({ oldDraggableIndex, newDraggableIndex })=>{
        dispatch(oneReorder(data[oldDraggableIndex], data[newDraggableIndex]))
    }, [data])

    return (
        <ReactSortable 
            key={enabled}
            disabled={!enabled}

            list={list}
            setList={ignoreFunc}
            onSort={undefined}
            onEnd={onSortEnd}

            tag='main'
            ghostClass={s.ghost}
            handle='> *'
            
            animation='135'
            easing='cubic-bezier(0.45, 0, 0.55, 1)'
            delay={100}
            delayOnTouchOnly={true}
            scroll={true}
            revertOnSpill={true}
            removeOnSpill={true}
            supportPointer={false} //fix safari >=13
            >
            {children}
        </ReactSortable>
    )
}