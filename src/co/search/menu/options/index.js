import s from './index.module.styl'
import React, { useCallback } from 'react'
import Option from './option'

export default function SearchMenuOptions({ downshift: { getItemProps, highlightedIndex }, options }) {
    const keyExtractor = useCallback(({_id})=>_id, [])

    return (
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
    )
}