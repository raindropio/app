import React, { useCallback } from 'react'

import Lazy from '~co/virtual/lazy'
import Section from './section'
import Item from './item'

export default function SearchMenuRecent({ downshift: { getItemProps, highlightedIndex }, suggestions, recent }) {
    const keyExtractor = useCallback(({_id})=>'_r_'+_id, [])

    if (!recent.length) return null

    return (
        <>
            <Section />

            <Lazy
                data={recent}
                scrollToItem={highlightedIndex >= 0 ? recent[highlightedIndex - suggestions.length] : undefined}
                keyExtractor={keyExtractor}>
                {(item, index)=>(
                    <Item 
                        item={item}
                        {...getItemProps({
                            key: keyExtractor(item),
                            index: suggestions.length + index,
                            item,
                            active: highlightedIndex == (suggestions.length + index)
                        })} />
                )}
            </Lazy>
        </>
    )
}