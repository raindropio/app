import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useFilterValue from './useFilterValue'
import useMenuItems from './useMenuItems'
import useDownshift from './useDownshift'

import Form from './form'
import Field from './field'
import Menu from './menu'

function Search({ autoFocus, spaceId, value: parentValue, events: { onSubmit } }) {
    const fieldRef = useRef(null)

    //value
    const [ value, setValue ] = useState(parentValue)
    useEffect(()=>setValue(parentValue), [parentValue])

    //filter
    const [ filter, applyFilter ] = useFilterValue(value, setValue)

    //menu items
    const suggestions= useMenuItems({ spaceId, value, filter })

    //downshift
    const downshift = useDownshift({ filter, applyFilter, suggestions })

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
                    suggestions={suggestions} />
            </Form>

            <Menu
                downshift={downshift}
                fieldRef={fieldRef}
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