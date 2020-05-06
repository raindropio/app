import React from 'react'
import { Virtuoso } from 'react-virtuoso'

const mainStyle = { width: '100%', height: '100%' }

export default ({ ...etc }) => (
    <Virtuoso
        {...etc}
        overscan={500}
        style={mainStyle}
    />
)