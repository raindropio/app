import s from './config.module.styl'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import t from '~t'
import { Checkbox } from '~co/common/form'

function CollectionLabel({ parentSpaceId }) {
    const getCollection = useMemo(makeCollection, [])
    const { title } = useSelector(state=>getCollection(state, parentSpaceId))
    return t.s('defaultCollection-0')+' '+t.s('only').toLowerCase()+' '+t.s('in')+' '+title
}

function Label({ item: {_id}, ...etc }) {
    switch (_id) {
        case 'fulltext':
            return t.s('fullTextSearch')

        case 'incollection':
            return <CollectionLabel {...etc} />
    
        default:
            return _id
    }
}

function SuggestionsConfig({ item, className='', active, forwardedRef, parentSpaceId, ...etc }) {
    const onChange = useCallback(()=>{}, [])

    return (
        <div 
            className={s.config+' '+className+' '+(active?s.active:'')}
            ref={forwardedRef}
            {...etc}>
            <Checkbox 
                checked={item.checked}
                onChange={onChange}>
                <Label item={item} parentSpaceId={parentSpaceId} />
            </Checkbox>
        </div>
    )
}

export default forwardRef((props, ref) => {
    return <SuggestionsConfig {...props} forwardedRef={ref} />
})