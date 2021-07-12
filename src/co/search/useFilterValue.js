import { useMemo, useCallback } from 'react'

import _ from 'lodash'

export default function useFilter(value, setValue) {
    const lastPart = useCallback((str)=>{
        const parts = (str||'').split(/\s+/)
        return (_.last(parts)||'').trim()
    }, [])

    const setLastPart = useCallback((str, val)=>
        (str+'').replace(new RegExp(`${_.escapeRegExp(lastPart(str))}$`), val),
        []
    )

    const filter = useMemo(()=>lastPart(value), [value])

    const applyFilter = useCallback((filter)=>{
        if (!value.endsWith(filter))
            setValue(setLastPart(value, filter))
    }, [value, setValue])

    return [filter, applyFilter]
}