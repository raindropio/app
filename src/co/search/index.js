import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useFilterValue from './useFilterValue'
import useMenuItems from './useMenuItems'
import useDownshift from './useDownshift'
import useSpaceId from './useSpaceId'

import Form from './form'
import Field from './field'
import Menu from './menu'

function Search({ autoFocus, spaceId: originalSpaceId, value: originalValue, events: { onSubmit } }) {
    const fieldRef = useRef(null)

    //space id
    const spaceId = useSpaceId({ originalSpaceId, originalValue })

    //value
    const [ value, setValue ] = useState(originalValue)
    useEffect(()=>setValue(originalValue), [originalValue, originalSpaceId])

    //filter
    const [ filter, applyFilter ] = useFilterValue(value, setValue)

    //menu items
    const { suggestions, recent } = useMenuItems({ spaceId, value, filter })

    //downshift
    const downshift = useDownshift({ filter, applyFilter, suggestions, recent })

    return (
        <>
            <Form
                downshift={downshift}
                spaceId={spaceId}
                originalSpaceId={originalSpaceId}
                value={value}
                originalValue={originalValue}
                suggestions={suggestions}
                onSubmit={onSubmit}>
                <Field
                    ref={fieldRef}
                    downshift={downshift}
                    autoFocus={autoFocus}
                    value={value}
                    setValue={setValue} />
            </Form>

            <Menu
                downshift={downshift}
                fieldRef={fieldRef}
                suggestions={suggestions}
                recent={recent}
                value={value}
                spaceId={spaceId}
                originalSpaceId={originalSpaceId} />
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