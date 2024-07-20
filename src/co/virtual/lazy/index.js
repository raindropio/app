import React, { memo } from 'react'
import { PropTypes } from 'prop-types'

import Visibility from './visibility'
import Item from './item'

const visibility = new Visibility()

function Lazy({ data = [], initialNumToRender, activateAfter, keyExtractor, scrollToItem, ...props }) {
    const active = data.length > activateAfter

    return data.map((item, index)=>(
        <Item 
            key={keyExtractor(item, index)}
            {...props}
            visibility={visibility}
            alwayVisible={!active || index < initialNumToRender}
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
    activateAfter: PropTypes.number,
    scrollToItem: PropTypes.any,

    //+ .../item
}

Lazy.defaultProps = {
    initialNumToRender: 10,
    activateAfter: 10
}

export default memo(Lazy)