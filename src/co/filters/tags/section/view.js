import s from './view.module.styl'
import React from 'react'
import t from '~t'

import { Section, SectionTitle, SectionActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function FiltersTagsSection({ onClick, onContextMenu }) {
    return (
        <Section className={s.section} onClick={onClick} onContextMenu={onContextMenu}>
            <SectionTitle>{t.s('tags')}</SectionTitle>
            <SectionActions>
                <Button 
                    title={t.s('more')}
                    onClick={onContextMenu}>
                    <Icon name='more_horizontal' />
                </Button>
            </SectionActions>
        </Section>
    )
}