import t from '~t'
import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { highlights as getHighlights } from '~data/selectors/bookmarks'
import { toggleHighlights } from '~local/actions'

import { Footer } from '~co/screen/splitview/reader'
import Button from '~co/common/button'
import { Number } from '~co/common/icon'

export default function ReaderHighlightsCollapsed({ item: { _id } }) {
    const dispatch = useDispatch()
    const highlights = useSelector(state=>getHighlights(state, _id))
    const onExpandClick = useCallback(()=>dispatch(toggleHighlights()), [])

    return (<Footer>
        <Button 
            variant='link'
            onClick={onExpandClick}>
            <Number>{highlights.length}</Number>
            {t.s('highlights')}
        </Button>
    </Footer>)
}