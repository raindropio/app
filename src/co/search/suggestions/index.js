import s from './index.module.styl'
import React, { useMemo, useEffect, useCallback } from 'react'
import t from '~t'
import { useDispatch, useSelector } from 'react-redux'
import { makeOptions, makeSuggestions } from '~data/selectors/search'
import { autoLoad } from '~data/actions/filters'

import Popover from '~co/overlay/popover'
import { Section } from '~co/common/list'
import Lazy from '~co/virtual/lazy'
import Option from './option'
import Item from './item'

const emptyArray = []
Object.freeze(emptyArray)

export default function SearchSuggestions({ spaceId, inputRef, setHaveSuggestions, downshift: { isOpen, getMenuProps, getItemProps, highlightedIndex, inputValue, setItemCount } }) {
    const dispatch = useDispatch()

    const getOptions = useMemo(makeOptions, [])
    const options = useSelector(state=>getOptions(state, spaceId, inputValue, inputRef.current && inputRef.current.value))

    const getSuggestions = useMemo(makeSuggestions, [])
    const suggestions = useSelector(state=>getSuggestions(state, spaceId, inputValue, inputRef.current && inputRef.current.value))

    //refresh suggestions
    useEffect(()=>{
        dispatch(autoLoad(spaceId, true))
        return ()=>dispatch(autoLoad(spaceId, false))
    }, [spaceId])

    //send
    useEffect(()=>{
        setHaveSuggestions(suggestions.length ? true : false)
        setItemCount(options.length + suggestions.length)
    }, [options.length, suggestions.length])

    const keyExtractor = useCallback(({query})=>query, [])

    if (!isOpen) return null

    return (
        <Popover 
            pin={inputRef}
            stretch={true}
            {...getMenuProps({ refKey: 'innerRef' })}>
            <div className={s.options}>
                {options.map((item, index)=>
                    <Option
                        item={item}
                        {...getItemProps({
                            key: keyExtractor(item),
                            index,
                            item,
                            active: highlightedIndex === index
                        })} />
                )}
            </div>

            {!inputValue && (
                <Section>{t.s('suggested')} {t.s('fastFilter')}</Section>
            )}

            <Lazy
                data={suggestions}
                scrollToItem={highlightedIndex >= 0 ? suggestions[options.length + highlightedIndex] : undefined}
                keyExtractor={keyExtractor}>
                {(item, index)=>(
                    <Item 
                        item={item}
                        {...getItemProps({
                            key: keyExtractor(item),
                            index: options.length + index,
                            item,
                            active: highlightedIndex === (options.length + index)
                        })} />
                )}
            </Lazy>
        </Popover>
    )
}