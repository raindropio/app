import s from './view.module.styl'
import React from 'react'
import t from '~t'
import _ from 'lodash'

import { Section, SectionTitle, SectionActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

const titles = {
    recent: 'Recent',
    other: _.capitalize(t.s('other'))
}

export default function TagsSectionView({className='', _id, ...props}) {
    return (
        <Section 
            {...props}
            className={s.section+' '+className}>
            <SectionTitle>{titles[_id] || t.s('tags')}</SectionTitle>
            
            {props.onContextMenu && (
                <SectionActions>
                    <Button 
                        title={t.s('more')}
                        onClick={props.onContextMenu}>
                        <Icon name='more_horizontal' />
                    </Button>
                </SectionActions>
            )}
        </Section>
    )
}