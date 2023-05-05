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

        const keepExistingUntouched = await Confirm('Default view changed', {
            variant: 'warning',
            description: <>
                <b>New collections</b> will now have a <b>{t.s(`view_${view}`)}</b> view mode.
                Do you want to also apply this change to all existing collections?
            </>,
            ok: 'Remain untouched',
            cancel: 'Update all'
        })

        if (!keepExistingUntouched)
            dispatch(manyChangeView(view))
    }, [])

    return (
        <>
            <Label>Default view mode</Label>
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