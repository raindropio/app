import React, { useRef, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import { bookmarksIds } from '~data/selectors/bookmarks'
import { SPACE_PER_PAGE } from '~data/constants/bookmarks'

import View from './view'
import Lazy from '~co/virtual/lazy'
import Sortable from './sortable'
import Item from '../item'
import Empty from './empty'

const initialNumToRender = parseInt(SPACE_PER_PAGE / 2)

export default function BookmarksItems(props) {
    const { spaceId, activeId, compact, compactLimit, getLink, events } = props

    //collection
    const getCollection = useRef(makeCollection()).current
    const { view, access } = useSelector(state=>getCollection(state, spaceId))

    //bookmarks
    const ids = useSelector(state=>bookmarksIds(state, spaceId))
    const items = useMemo(
        ()=>!compact ? ids : ids.slice(0, compactLimit), 
        [ids, compact, compactLimit]
    )
    const keyExtractor = useCallback(_id=>_id, [])

    if (!items.length)
        return <Empty {...props} />

    return (
        <View 
            spaceId={spaceId} 
            view={view}>
            <Sortable 
                data={items}
                spaceId={spaceId}>
                <Lazy
                    data={items}
                    keyExtractor={keyExtractor}
                    initialNumToRender={initialNumToRender}

                    scrollToItem={activeId}

                    mode={view == 'masonry' ? 'row-end-span' : 'height'}
                    gridCellSize={31} //grid-gap + grid-auto-rows
                    >
                    {_id=>
                        <Item
                            _id={_id}
                            //collection
                            spaceId={spaceId}
                            view={view}
                            access={access}
                            //listing specififc
                            active={activeId == _id}
                            getLink={getLink}
                            events={events} />
                    }
                </Lazy>
            </Sortable>
        </View>
    )
}