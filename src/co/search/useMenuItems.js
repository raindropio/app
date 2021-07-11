import { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeOptions, makeSuggestions } from '~data/selectors/search'
import { autoLoad } from '~data/actions/filters'

export default function useMenuItems({ spaceId, filter, value }) {
    const dispatch = useDispatch()

    const getOptions = useMemo(makeOptions, [])
    const options = useSelector(state=>getOptions(state, spaceId, filter, value))

    const getSuggestions = useMemo(makeSuggestions, [])
    const suggestions = useSelector(state=>getSuggestions(state, spaceId, filter, value))

    //refresh suggestions
    useEffect(()=>{
        dispatch(autoLoad(spaceId, true))
        return ()=>dispatch(autoLoad(spaceId, false))
    }, [spaceId])

    return { options, suggestions }
}