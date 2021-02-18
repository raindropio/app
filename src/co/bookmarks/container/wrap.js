import s from './wrap.module.styl'
import React from 'react'

import AccentColor from '~co/collections/item/accentColor'
import Drop from '../dnd/drop'

export default function BookmarksContainerWrap({ spaceId, children }) {
    return (
        <AccentColor _id={spaceId}>{style=>
            <Drop spaceId={spaceId}>{({ dropHandlers, isDropping })=>
                <div 
                    className={`${s.wrap} ${isDropping && s.isDropping}`}
                    style={style}
                    {...dropHandlers}>
                    {children}
                </div>
            }</Drop>
        }</AccentColor>
    )
}