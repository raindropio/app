import s from './index.module.styl'
import React from 'react'
import t from '~t'

import { Label, Separator } from '~co/common/form'
import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'

export default function SettingsIntegrationsConnections() {
    return (
        <>
            <Label>
                {t.s('connected')}<br/>
                {t.s('interest_technology_applications').toLowerCase()}
            </Label>

            <div className={s.list}>
                <Item
                    as='a'
                    href='https://www.alfredforum.com/topic/14357-search-raindropio-open-bookmarks-in-active-browser/'
                    target='_blank'>
                    <ItemIcon><img src='https://up.raindrop.io/user/clients/417/714/d00ebc64-787b-4080-9405-939da8e1f4a5-Alfred.png' /></ItemIcon>
                    <ItemTitle>Raindrop Alfred Search</ItemTitle>
                    <ItemInfo>Search your Raindrop.io bookmarks from Alfred</ItemInfo>
                    <ItemActions>
                        <Button 
                            variant='outline'
                            size='small'>
                            {t.s('disable')}
                        </Button>
                    </ItemActions>
                </Item>
            </div>

            <Separator />
        </>
    )
}