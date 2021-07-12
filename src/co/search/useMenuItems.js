import { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeConfigs, makeSuggestions } from '~data/selectors/search'
import { autoLoad } from '~data/actions/filters'

export default function useMenuItems({ spaceId, parentSpaceId, filter, value }) {
    const dispatch = useDispatch()

    const getConfigs = useMemo(makeConfigs, [])
    const configs = useSelector(state=>getConfigs(state, parentSpaceId, filter, value))

    const getSuggestions = useMemo(makeSuggestions, [])
    const suggestions = useSelector(state=>getSuggestions(state, spaceId, filter, value))

    //refresh suggestions
    useEffect(()=>{
        dispatch(autoLoad(spaceId, true))
        return ()=>dispatch(autoLoad(spaceId, false))
    }, [spaceId])

    return { configs, suggestions }
}