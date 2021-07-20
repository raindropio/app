import { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeSuggestions } from '~data/selectors/search'
import { autoLoad } from '~data/actions/filters'

const isLocalCollectionToken = /local:collection\s?/

export default function useMenuItems({ spaceId: parentSpaceId, filter, value }) {
    const dispatch = useDispatch()

    const spaceId = useMemo(()=>
        isLocalCollectionToken.test(value) ? parentSpaceId : 'global'
        , [parentSpaceId, value]
    )

    const getSuggestions = useMemo(makeSuggestions, [])
    const suggestions = useSelector(state=>getSuggestions(state, spaceId, filter, value, parentSpaceId))

    //refresh suggestions
    useEffect(()=>{
        dispatch(autoLoad(spaceId, true))
        return ()=>dispatch(autoLoad(spaceId, false))
    }, [spaceId])

    return suggestions
}