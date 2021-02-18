import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { makeViewHide } from '~data/selectors/bookmarks'

import List from './list'
import Simple from './simple'
import Grid from './grid'
import Masonry from './masonry'

export default function BookmarksItemsView({ spaceId, view, children }) {
    const getViewHide = useRef(makeViewHide()).current
    const viewHide = useSelector(state=>getViewHide(state, spaceId))
    const buttons = useSelector(state=>state.config.raindrops_buttons)

    let Component
    
    switch(view) {
        case 'simple': Component = Simple; break;
        case 'grid': Component = Grid; break;
        case 'masonry': Component = Masonry; break;
        default: Component = List; break;
    }

    return (
        <Component 
            spaceId={spaceId}
            className={`
                ${viewHide.map(field=>`hide-${field}`).join(' ')}
                ${buttons.map(field=>`button-${field}`).join(' ')}
            `}>
            {children}
        </Component>
    )
}