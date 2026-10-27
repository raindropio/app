import { useMemo } from 'react'
import { getSpaceCacheId } from '~data/helpers/bookmarks'

//use it instead of raw `cId`
export default function useSpaceCacheId(cId, search) {
    return useMemo(()=>getSpaceCacheId(cId, search), [cId, search])
}
