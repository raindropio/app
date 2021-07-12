import s from './index.module.styl'
import React, { useCallback } from 'react'
import Config from './config'

export default function SearchMenuConfigs({ downshift: { getItemProps, highlightedIndex }, configs, parentSpaceId }) {
    const keyExtractor = useCallback(({_id})=>_id, [])

    return (
        <div className={s.configs}>
            {configs.map((item, index)=>
                <Config
                    item={item}
                    parentSpaceId={parentSpaceId}
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