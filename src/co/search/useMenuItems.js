import { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeSuggestions } from '~data/selectors/search'
import { autoLoad } from '~data/actions/filters'

export default function useMenuItems({ spaceId: parentId, filter, value, all }) {
    const dispatch = useDispatch()

    const spaceId = useMemo(()=>all?0:parentId, [parentId, all])

    const getSuggestions = useMemo(makeSuggestions, [])
    const suggestions = useSelector(state=>getSuggestions(state, spaceId, filter, value))

    //refresh suggestions
    useEffect(()=>{
        dispatch(autoLoad(spaceId, true))
        return ()=>dispatch(autoLoad(spaceId, false))
    }, [spaceId])

    return suggestions
}