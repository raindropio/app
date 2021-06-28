import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { manyCreate } from '~data/actions/bookmarks'

export default function ExtensionTabsSubmit({ tabs, collectionId, tags }) {
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
                ()=>window.close(),
                e=>{
                    setLoading(false)
                    Error(e)
                }
            )
        )
    }, [tabs, collectionId, tags])

    return {
        onSubmit,
        loading
    }
}