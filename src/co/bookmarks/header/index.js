import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { makeSelectModeEnabled } from '~data/selectors/bookmarks'

import Regular from './regular'
import SelectMode from './selectMode'

export default function BookmarksHeader(props) {
    const { spaceId } = props
    
    const getSelectModeEnabled = useRef(makeSelectModeEnabled()).current
    const selectModeEnabled = useSelector(state=>getSelectModeEnabled(state, spaceId))

    return selectModeEnabled ?
        <SelectMode {...props} /> :
        <Regular {...props} />  
}