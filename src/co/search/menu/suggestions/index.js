import React, { useCallback } from 'react'
import Lazy from '~co/virtual/lazy'
import Item from './item'
import Tip from './tip'

export default function SearchMenuSuggestions({ downshift: { getItemProps, highlightedIndex }, configs, suggestions }) {
    const keyExtractor = useCallback(({query})=>query, [])

    if (!suggestions.length) return null

    return (
        <>
            <Tip suggestions={suggestions} />

            <Lazy
                data={suggestions}
                scrollToItem={highlightedIndex >= 0 ? suggestions[configs.length + highlightedIndex] : undefined}
                keyExtractor={keyExtractor}>
                {(item, index)=>(
                    <Item 
                        item={item}
                        {...getItemProps({
                            key: keyExtractor(item),
                            index: configs.length + index,
                            item,
                            active: highlightedIndex === (configs.length + index)
                        })} />
                )}
            </Lazy>
        </>
    )
}