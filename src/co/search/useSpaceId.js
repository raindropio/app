import { useSelector } from 'react-redux'

export default function useSpaceId(parentSpaceId) {
    const incollection = useSelector(state=>state.config.raindrops_search_incollection)

    return incollection ? parentSpaceId : 0
}