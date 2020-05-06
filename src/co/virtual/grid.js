import React from 'react'
import { VirtuosoGrid } from 'react-virtuoso'

const mainStyle = { width: '100%', height: '100%' }

export default ({ className, ...etc }) => (
    <VirtuosoGrid
        {...etc}
        listClassName={className}
        itemClassName='grid-item'
        style={mainStyle}
    />
)