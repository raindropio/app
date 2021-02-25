import React, { memo } from 'react'
import { PropTypes } from 'prop-types'

import Visibility from './visibility'
import Item from './item'

const visibility = new Visibility()

function Lazy({ data, initialNumToRender, keyExtractor, scrollToItem, ...props }) {
    return data.map((item, index)=>(
        <Item 
            key={keyExtractor(item, index)}
            {...props}
            visibility={visibility}
            alwayVisible={index < initialNumToRender}
            scrollIntoView={scrollToItem == item}
            index={index}
            item={item} />
    ))
}

Lazy.propTypes = {
    //wrap specific
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    keyExtractor: PropTypes.func.isRequired,
    initialNumToRender: PropTypes.number,
    scrollToItem: PropTypes.any,

    //+ .../item
}

Lazy.defaultProps = {
    initialNumToRender: 10,
}

export default memo(Lazy)