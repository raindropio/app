import React, { memo } from 'react'
import { PropTypes } from 'prop-types'

import Visibility from './visibility'
import Item from './item'

const visibility = new Visibility()

function Lazy({ data, initialNumToRender, keyExtractor, ...props }) {
    return data.map((item, index)=>(
        <Item 
            key={keyExtractor(item, index)}
            {...props}
            visibility={visibility}
            alwayVisible={index <= initialNumToRender}
            index={index}
            item={item} />
    ))
}

Lazy.propTypes = {
    //wrap specific
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    keyExtractor: PropTypes.func.isRequired,
    initialNumToRender: PropTypes.number,

    //+ .../item
}

Lazy.defaultProps = {
    initialNumToRender: 10
}

export default memo(Lazy)