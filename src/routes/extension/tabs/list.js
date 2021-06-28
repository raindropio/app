import s from './list.module.styl'
import React, { useCallback } from 'react'
import t from '~t'
import { Wrap, Item, ItemIcon, ItemTitle, ItemActions } from '~co/common/list'
import { Label } from '~co/common/form'
import Icon from '~co/common/icon'
import Button from '~co/common/button'

export default function AddTabsList({ tabs, setTabs }) {
    const removeTab = useCallback(id=>{
        setTabs(
            tabs.filter(tab=>tab.id!=id)
        )
    }, [tabs, setTabs])

    return (
        <>
            <Label>{tabs.length} {t.s('tabs').toLowerCase()}</Label>

            <Wrap className={s.list}>
                {tabs.map(({ id, url, title, favIconUrl })=>(
                    <Item 
                        key={id}
                        title={url}>
                        <ItemIcon>{favIconUrl ? <img src={favIconUrl} /> : <Icon name='web' />}</ItemIcon>
                        <ItemTitle>{title}</ItemTitle>
                        <ItemActions>
                            <Button 
                                title={t.s('remove')}
                                onClick={()=>removeTab(id)}>
                                <Icon name='trash' />
                            </Button>
                        </ItemActions>
                    </Item>
                ))}
            </Wrap>
        </>
    )
}