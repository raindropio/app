import t from '~t'
import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { highlights as getHighlights } from '~data/selectors/bookmarks'
import { toggleHighlights } from '~local/actions'

import { Footer } from '~co/screen/splitview/reader'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ReaderHighlightsCollapsed({ item: { _id }, tab }) {
    const dispatch = useDispatch()
    const highlights = useSelector(state=>getHighlights(state, _id))
    const onExpandClick = useCallback(()=>dispatch(toggleHighlights()), [])

    return (<Footer data-no-shadow={tab=='edit'}>
        <Button 
            variant='link'
            onClick={onExpandClick}>
            <Icon name='highlights' />
            {highlights.length + ' ' + t.s('highlights').toLowerCase()}
        </Button>
    </Footer>)
}