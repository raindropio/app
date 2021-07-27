import s from './section.module.styl'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { recentSearchClear } from '~data/actions/bookmarks'
import t from '~t'

import { Section, SectionTitle, SectionActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SearchMenuRecent() {
    const dispatch = useDispatch()
    const onClearClick = useCallback(()=>dispatch(recentSearchClear()), [])

    return (
        <Section className={s.section}>
            <SectionTitle>
                {t.s('recent')}
            </SectionTitle>

            <SectionActions>
                <Button
                    size='small'
                    variant='outline'
                    title={`${t.s('remove')} ${t.s('recent').toLowerCase()}`}
                    onClick={onClearClick}>
                    <Icon name='close' size='micro' />
                </Button>
            </SectionActions>
        </Section>
    )
}