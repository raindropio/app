import s from './option.module.styl'
import React, { forwardRef, useCallback } from 'react'
import t from '~t'
import { Checkbox } from '~co/common/form'

let labels
function getLabel({ _id }) {
    if (!labels)
        labels = {
            'fulltext': t.s('fullTextSearch')
        }
    return labels[_id] || _id
}

function SuggestionsOption({ item, className='', active, forwardedRef, ...etc }) {
    const onChange = useCallback(()=>{}, [])

    return (
        <div 
            className={s.option+' '+className+' '+(active?s.active:'')}
            ref={forwardedRef}
            {...etc}>
            <Checkbox 
                checked={item.checked}
                onChange={onChange}>
                {getLabel(item)}
            </Checkbox>
        </div>
    )
}

export default forwardRef((props, ref) => {
    return <SuggestionsOption {...props} forwardedRef={ref} />
})