import s from './list.module.styl'
import React, { useCallback } from 'react'
import t from '~t'
import { getDomain } from '~modules/format/url'
import { AnimatePresence, motion } from 'framer-motion'

import Alert from '~co/common/alert'
import { Wrap, Item, ItemIcon, ItemTitle, ItemActions } from '~co/common/list'
import { Label } from '~co/common/form'
import Icon from '~co/common/icon'
import Button from '~co/common/button'
import Cover from '~co/bookmarks/item/cover'

export default function AddTabsList({ tabs, setTabs }) {
    const removeTab = useCallback(id=>{
        setTabs(
            tabs.filter(tab=>tab.id!=id)
        )
    }, [tabs, setTabs])

    return (
        <>
            <Label>{t.s('tabs')}</Label>

            {tabs.length ? (
                <Wrap className={s.list}>
                    <AnimatePresence initial={false}>
                        {tabs.map(({ id, url, title, favIconUrl })=>(
                            <Item 
                                key={id}

                                as={motion.div}
                                layout
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}

                                title={title}>
                                <ItemIcon>{favIconUrl ? 
                                    <img src={favIconUrl} /> :
                                    <Cover 
                                        link={url}
                                        domain={getDomain(url)}
                                        view='simple' />
                                }</ItemIcon>
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
                    </AnimatePresence>
                </Wrap>
            ) : (
                <Alert variant='warning'>
                    {t.s('nothingFound')}
                </Alert>
            )}
        </>
    )
}