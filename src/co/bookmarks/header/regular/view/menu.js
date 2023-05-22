import React, { useCallback, useMemo } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import { oneChangeView, manyChangeView } from '~data/actions/collections'
import { set } from '~data/actions/config'

import { Radio, Label } from '~co/common/form'
import Icon from '~co/common/icon'
import Button from '~co/common/button'

export default function BookmarksHeaderViewMenu({ spaceId, collection: { view }, onClose }) {
    const dispatch = useDispatch()

    const options = useMemo(()=>({
        'list':     t.s('view_list'),
        'grid':     t.s('view_grid'),
        'simple':   t.s('view_simple'),
        'masonry':  t.s('view_masonry'),
    }), [])

    const onViewClick = useCallback((e)=>
        dispatch(oneChangeView(spaceId, e.target.getAttribute('data-view'))),
        [spaceId, dispatch]
    )

    const onApplyToAllClick = useCallback(e=>{
        e.preventDefault()
        dispatch(set('default_collection_view', view))
        dispatch(manyChangeView(view))
        onClose()
    }, [view, onClose])

    return (
        <>
            <Label>{t.s('view')}</Label>
            <div>
                {Object.keys(options).map(item=>(
                    <Radio 
                        key={item}
                        autoFocus={view==item}
                        data-view={item}
                        checked={view==item}
                        onChange={onViewClick}>
                        <Icon name={'view_'+item} />
                        {t.s(`view_${item}`)}
                    </Radio>
                ))}
            </div>

            <Button 
                variant='outline'
                onClick={onApplyToAllClick}>
                {t.s('applyToAll')}
            </Button>
        </>
    )
}