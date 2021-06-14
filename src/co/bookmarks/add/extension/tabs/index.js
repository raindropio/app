import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import t from '~t'
import browser from '~target/extension/browser'
import { manyCreate, selectOne } from '~data/actions/bookmarks'

import { Error } from '~co/overlay/dialog'
import { MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'
import LoadingDialog from '~co/overlay/dialog/view/loading'

export default function BookmarksAddFallbackFile({ spaceId }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const onClick = useCallback(async e=>{
        e.preventDefault()

        try{
            setLoading(true)

            await browser.permissions.request({ permissions: ['tabs'] })
            const tabs = await browser.tabs.query({ currentWindow: true })

            const created = await new Promise((res,rej)=>
                dispatch(
                    manyCreate(
                        tabs.map(tab=>({
                            link: tab.url,
                            title: tab.title,
                            collectionId: spaceId
                        })),
                        res,
                        rej
                    )
                )
            )

            //select created
            if (created.length > 1)
                dispatch(
                    selectOne(
                        spaceId,
                        created[0]._id,
                        true
                    )
                )
        } catch(e) {
            Error(e)
        } finally {
            setLoading(false)
        }
    }, [spaceId])

    return (
        <>
            <MenuItem 
                as='label'
                onClick={onClick}>
                <Icon name='tabs' />
                {t.s('save')} {t.s('all').toLowerCase()} {t.s('tabs').toLowerCase()}
            </MenuItem>

            {loading && <LoadingDialog />}
        </>
    )
}