import s from './view.module.styl'
import React from 'react'
import t from '~t'
import _ from 'lodash'

import { Section, SectionTitle, SectionActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

let _titles
function getTitles() {
    if (!_titles)
        _titles = {
            recent: t.s('recent'),
            collection: _.capitalize(t.s('in')) + ' ' + t.s('collection').toLowerCase(),
            other: _.capitalize(t.s('other'))
        }
    return _titles
}

export default function TagsSectionView({className='', item: { _id, count, hidden }, hideSection, getLink, reorder, ...props}) {
    return (
        <Section 
            {...props}
            className={s.section+' '+className}>
            <SectionTitle>{getTitles()[_id] || t.s('tags')} {count ? `(${count})` : ''}</SectionTitle>
            
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