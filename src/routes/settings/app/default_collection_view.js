import React, { useCallback } from 'react'
import t from '~t'
import { useDispatch, useSelector } from 'react-redux'
import { set } from '~data/actions/config'
import { manyChangeView } from '~data/actions/collections'
import { Confirm } from '~co/overlay/dialog'

import { Label } from '~co/common/form'
import Select from '~co/common/select'
import Icon from '~co/common/icon'

export default function SettingsAppDefaultCollectionView() {
    const dispatch = useDispatch()
    const view = useSelector(state=>state.config.default_collection_view)

    const onChange = useCallback(async e=>{
        const view = e.target.value
        dispatch(set('default_collection_view', view))

        const keepExistingUntouched = await Confirm(t.s('defaultViewChanged'), {
            variant: 'warning',
            description: t.format('defaultViewDescription', t.s(`view_${view}`)),
            ok: t.s('remainUntouched'),
            cancel: t.s('updateAll')
        })

        if (!keepExistingUntouched)
            dispatch(manyChangeView(view))
    }, [])

    return (
        <>
            <Label>{t.s('defaultViewMode')}</Label>
            <div>
                <Select 
                    variant='outline'
                    value={view}
                    onChange={onChange}>
                    {['list', 'grid', 'masonry', 'simple'].map(key=>
                        <option
                            key={key}
                            value={key}>
                            <Icon name={'view_'+key} />
                            {t.s(`view_${key}`)}
                        </option>
                    )}
                </Select>
            </div>
        </>
    )
}