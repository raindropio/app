import React, { useRef, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

import useSpaceId from './useSpaceId'
import useFilterValue from './useFilterValue'
import useMenuItems from './useMenuItems'
import useDownshift from './useDownshift'

import Form from './form'
import Field from './field'
import Menu from './menu'

function Search({ autoFocus, spaceId: parentSpaceId, value: parentValue, events: { onSubmit } }) {
    const fieldRef = useRef(null)

    //spaceId
    const spaceId = useSpaceId(parentSpaceId)

    //value
    const [ value, setValue ] = useState(parentValue)
    useEffect(()=>setValue(parentValue), [parentValue, parentSpaceId])

    //filter
    const [ filter, applyFilter ] = useFilterValue(value, setValue)

    //menu items
    const { configs, suggestions } = useMenuItems({ spaceId, parentSpaceId, value, filter })
    const menuItemsCount = useMemo(()=>
        configs.length + suggestions.length,
        [configs.length, suggestions.length]
    )

    //downshift
    const downshift = useDownshift({ filter, applyFilter, configs, suggestions })

    return (
        <>
            <Form
                downshift={downshift}
                spaceId={spaceId}
                value={value}
                parentValue={parentValue}
                suggestions={suggestions}
                onSubmit={onSubmit}>
                <Field
                    ref={fieldRef}
                    downshift={downshift}
                    autoFocus={autoFocus}
                    value={value}
                    setValue={setValue}
                    menuItemsCount={menuItemsCount} />
            </Form>

            <Menu
                parentSpaceId={parentSpaceId}
                downshift={downshift}
                fieldRef={fieldRef}
                menuItemsCount={menuItemsCount}
                configs={configs}
                suggestions={suggestions} />
        </>
    )
}

Search.defaultProps = {
    events: {}
}

Search.propTypes = {
    value: PropTypes.string,
    autoFocus: PropTypes.bool,
    spaceId: PropTypes.any,
    events: PropTypes.shape({
        onSubmit: PropTypes.func //({ search, _id })
    })
}

export default Search