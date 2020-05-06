import React from 'react'
import { Virtuoso } from 'react-virtuoso'

export default ({ itemRenderer, itemsCount, overscanRowCount, onEndReached, ...etc }) => (
    <Virtuoso
        {...etc}
        totalCount={itemsCount}
        overscan={overscanRowCount}
        item={itemRenderer}
        endReached={onEndReached}
        style={{ height: '100%', width: '100%' }}
    />
)