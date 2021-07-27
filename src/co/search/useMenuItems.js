import { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeSuggestions, makeRecent } from '~data/selectors/search'
import { autoLoad } from '~data/actions/filters'

export default function useMenuItems({ spaceId, filter, value }) {
    const dispatch = useDispatch()

    const getSuggestions = useMemo(makeSuggestions, [])
    const suggestions = useSelector(state=>getSuggestions(state, spaceId, filter, value))

    const getRecent = useMemo(makeRecent, [])
    const recent = useSelector(state=>getRecent(state, spaceId, filter, value))

    //refresh suggestions
    useEffect(()=>{
        dispatch(autoLoad(spaceId, true))
        return ()=>dispatch(autoLoad(spaceId, false))
    }, [spaceId])

    return {
        suggestions,
        recent
    }
}