import React, { useCallback } from 'react'
import t from '~t'

import { Section } from '~co/common/list'
import Lazy from '~co/virtual/lazy'
import Item from './item'

export default function SearchMenuSuggestions({ downshift: { getItemProps, highlightedIndex }, configs, suggestions }) {
    const keyExtractor = useCallback(({query})=>query, [])

    if (!suggestions.length) return null

    return (
        <>
            {!!configs.length && (<Section>{t.s('suggested')} {t.s('fastFilter')}</Section>)}

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