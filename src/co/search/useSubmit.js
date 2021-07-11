import { useCallback, useMemo, useEffect } from 'react'
import _ from 'lodash-es'

export default function useSubmit({ value, suggestions, onSubmit }) {
    const haveSuggestions = suggestions.length ? true : false

    //bounced
    const onSubmitBounced = useMemo(()=>
        _.debounce(onSubmit, 350, { maxWait: 1000 }),
        [onSubmit]
    )

    //auto submit on value change
    useEffect(()=>{
        onSubmitBounced.cancel()

        //submit immediately
        if (!value || value.endsWith(' '))
            onSubmit(value)
        //suggestions
        else if (haveSuggestions)
            return

        onSubmitBounced(value)
    }, [value, haveSuggestions, onSubmitBounced])

    return useCallback(()=>onSubmit(value), [value])
}