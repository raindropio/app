import { useCallback, useState } from 'react'
import browser from '~target/extension/browser'
import { useDispatch } from 'react-redux'
import { manyCreate } from '~data/actions/bookmarks'

export default function ExtensionTabsSubmit({ tabs, collectionId, tags, close }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const onSubmit = useCallback(e=>{
        e.preventDefault()

        //loading
        setLoading(true)

        //save
        dispatch(
            manyCreate(
                tabs.map(({title, url})=>({
                    title,
                    link: url,
                    collectionId,
                    tags
                })),
                async()=>{
                    if (close)
                        await browser.tabs.remove(tabs.map(({id})=>id))
                    
                    window.close()
                },
                e=>{
                    setLoading(false)
                    Error(e)
                }
            )
        )
    }, [tabs, collectionId, tags, close])

    return {
        onSubmit,
        loading
    }
}