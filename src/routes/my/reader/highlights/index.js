import React from 'react'
import { useSelector } from 'react-redux'
import { highlights as getHighlights } from '~data/selectors/bookmarks'

import Expanded from './expanded'
import Collapsed from './collapsed'

export default function ReaderHighlights(props) {
    const { item: { _id } } = props
    const highlights = useSelector(state=>getHighlights(state, _id))
    const expanded = useSelector(state=>state.local.highlightsExpanded)

    //no highlights
    if (!highlights.length)
        return null

    if (expanded)
        return <Expanded {...props} />

    return <Collapsed {...props} />
}