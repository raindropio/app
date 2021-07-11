import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import debounce from '~modules/format/callback/debounce'

import Input from './input'
import Suggestions from './suggestions'

//events={onSubmit}
export default function Search({ spaceId=0, autoFocus=false, events={}, ...etc }) {
    const history = useHistory()

    //input
    const inputRef = useRef(null)
    const [value, setValue] = useState(()=>etc.value)
    useEffect(()=>setValue(etc.value),[etc.value])

    //suggestions showing
    const [haveSuggestions, setHaveSuggestions] = useState(false)

    //submit
    const onSubmit = useCallback(e=>{
        if (e && e.preventDefault)
            e.preventDefault()

        events.onSubmit(value)
    }, [value, events.onSubmit])

    const submitBounced = useMemo(()=>
        debounce(events.onSubmit, 350, { maxWait: 1000 }),
        [events.onSubmit]
    )

    //auto submit on value change
    useEffect(()=>{
        if (value && value.includes('collection:')){
            setValue('')
            return history.push(`/my/${value.match(/collection:(-?\d+)/)[1]}`)
        }
        //submit immediately
        if (!value || value.endsWith(' '))
            events.onSubmit(value)
        //suggestions
        else if (haveSuggestions)
            return
        submitBounced(value)
    }, [value, haveSuggestions, events.onSubmit, submitBounced])

    return (
        <Input
            spaceId={spaceId}
            value={value}
            autoFocus={autoFocus}
            inputRef={inputRef}
            onChange={setValue}
            onSubmit={onSubmit}>
            {downshift => (
                <Suggestions 
                    spaceId={spaceId}
                    inputRef={inputRef}
                    downshift={downshift}
                    setHaveSuggestions={setHaveSuggestions} />
            )}
        </Input>
    )
}