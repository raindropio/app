import React, { useRef, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

import useFilterValue from './useFilterValue'
import useMenuItems from './useMenuItems'
import useDownshift from './useDownshift'
import useSubmit from './useSubmit'

import Form from './form'
import Field from './field'
import Menu from './menu'

function Search({ spaceId, autoFocus, value: parentValue, events: { onSubmit } }) {
    const fieldRef = useRef(null)

    //value
    const [ value, setValue ] = useState(()=>parentValue)
    useEffect(()=>setValue(parentValue), [parentValue])

    //filter
    const [ filter, applyFilter ] = useFilterValue(value, setValue)

    //menu items
    const { options, suggestions } = useMenuItems({ spaceId, value, filter })
    const menuItemsCount = useMemo(()=>
        options.length + suggestions.length,
        [options.length, suggestions.length]
    )

    //downshift
    const downshift = useDownshift({ filter, applyFilter, options, suggestions })

    //submit
    const submit = useSubmit({ value, options, suggestions, onSubmit })

    return (
        <>
            <Form
                downshift={downshift}
                submit={submit}>
                <Field
                    ref={fieldRef}
                    downshift={downshift}
                    autoFocus={autoFocus}
                    value={value}
                    setValue={setValue}
                    menuItemsCount={menuItemsCount} />
            </Form>

            <Menu
                downshift={downshift}
                fieldRef={fieldRef}
                menuItemsCount={menuItemsCount}
                options={options}
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
        onSubmit: PropTypes.func //(value)
    })
}

export default Search