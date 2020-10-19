import s from './view.module.styl'
import React from 'react'
import _ from 'lodash'
import t from '~t'

import { Section, SectionTitle, SectionActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function FiltersSection({ className='', hidden, ...props}) {
    return (
        <Section 
            {...props}
            className={s.section+' '+className}>
            <SectionTitle>{_.capitalize(t.s('fastFilter'))}</SectionTitle>

            {props.onContextMenu && (
                <SectionActions>
                    {hidden ?
                        <Button 
                            variant='outline'
                            size='small'>
                            {t.s('show')}
                        </Button>
                        :
                        <Button 
                            title={t.s('more')}
                            onClick={props.onContextMenu}>
                            <Icon name='more_horizontal' />
                        </Button>
                    }
                </SectionActions>
            )}
        </Section>
    )
}