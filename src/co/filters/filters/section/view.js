import s from './view.module.styl'
import React from 'react'
import _ from 'lodash'
import t from '~t'

import { Section, SectionTitle, SectionActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function FiltersSection({ onClick, onContextMenu }) {
    return (
        <Section className={s.section} onClick={onClick} onContextMenu={onContextMenu}>
            <SectionTitle>{_.capitalize(t.s('fastFilter'))}</SectionTitle>

            {onContextMenu && (
                <SectionActions>
                    <Button 
                        title={t.s('more')}
                        onClick={onContextMenu}>
                        <Icon name='more_horizontal' />
                    </Button>
                </SectionActions>
            )}
        </Section>
    )
}