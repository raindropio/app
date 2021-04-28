import React, { useCallback } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import { oneUpdate } from '~data/actions/collections'

import { Layout, Checkbox, Label } from '~co/common/form'

export default function SharingPublicEnable({ collection: { _id, public: pub, access } }) {
    const dispatch = useDispatch()

    const togglePublic = useCallback(()=>{
        dispatch(oneUpdate(_id, { public: !pub }))
    }, [_id, pub])

    return (
        <Layout>
            <div>
                <Checkbox 
                    checked={pub}
                    disabled={!access || access.level < 3}
                    onChange={togglePublic}>
                    <b>{t.s('share')}</b>
                </Checkbox>

                <Label>{t.s('publicD')}</Label>
            </div>
        </Layout>
    )
}