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
    useEffect(()=>setValue(parentValue), [parentValue, spaceId])

    //search all
    const [ all, setAll ] = useState(true)
    useEffect(()=>{ if (!parseInt(spaceId)) setAll(true) }, [spaceId])

    //filter
    const [ filter, applyFilter ] = useFilterValue(value, setValue)

    //menu items
    const suggestions= useMenuItems({ spaceId, value, filter, all })

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
                all={all}
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
                spaceId={spaceId}
                all={all}
                setAll={setAll} />
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