import { useMemo, useEffect } from 'react'
import browser from '~target/extension/browser'
import { useSelector } from 'react-redux'
import { makeBookmarksLastChange } from '~data/selectors/bookmarks'

export default function useBookmarksChanged() {
    const getBookmarksLastChange = useMemo(()=>makeBookmarksLastChange(), [])
    const bookmarksChange = useSelector(state=>getBookmarksLastChange(state))

    useEffect(()=>{
        browser.runtime.sendMessage(null, { type: 'BOOKMARKS_CHANGED' })
    }, [bookmarksChange])
}