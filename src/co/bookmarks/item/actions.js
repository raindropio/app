import s from './actions.module.styl'
import t from '~t'
import React from 'react'

import { Link } from 'react-router-dom'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function BookmarkItemActions(props) {
    const { _id, link, access, important } = props
    const { className='' } = props
    const { getLink, onCopyLinkClick, onImportantClick, onRemoveClick } = props

    return (
        <div className={s.actions+' '+className}>
            {/* current_tab */}
            <Button 
                data-button='current_tab'
                href={link}
                rel='noopener'
                variant='outline'
                title={t.s('open')}>
                <Icon name='click' />
            </Button>

            {/* new_tab */}
            <Button 
                data-button='new_tab'
                href={link}
                target='_blank'
                rel='noopener'
                variant='outline'
                title={t.s('open')+' '+t.s('inNewTab')}>
                <Icon name='open' />
            </Button>

            {/* preview */}
            <Button 
                data-button='preview'
                as={Link}
                to={getLink({ bookmark: _id, tab: 'preview' })}
                variant='outline'
                title={t.s('preview')}>
                <Icon name='show' />
            </Button>

            {/* web */}
            <Button 
                data-button='web'
                as={Link}
                to={getLink({ bookmark: _id, tab: 'web' })}
                variant='outline'
                title={'Web '+t.s('preview')}>
                <Icon name='web' />
            </Button>

            {/* copy */}
            <Button 
                data-button='copy'
                onClick={onCopyLinkClick}
                variant='outline'
                title={t.s('copyLinkToClipboard')}>
                <Icon name='duplicates' />
            </Button>

            {access && access.level >= 3 ? (<>
                {/* important */}
                <Button 
                    data-button='important'
                    onClick={onImportantClick}
                    variant='outline'
                    title={(important ? (t.s('remove')+' '+t.s('from')) : (t.s('add') +' ' + t.s('to'))) + ' ' + t.s('favorites').toLowerCase()}>
                    <Icon name={'like'+(important?'_active':'')} />
                </Button>

                {/* tags */}
                <Button 
                    data-button='tags'
                    as={Link}
                    to={getLink({ bookmark: _id, tab: 'edit', autoFocus: 'tags' })}
                    variant='outline'>
                    <Icon name='tag' />
                </Button>
                
                {/* edit */}
                <Button 
                    data-button='edit'
                    as={Link}
                    to={getLink({ bookmark: _id, tab: 'edit', autoFocus: '' })}
                    variant='outline'>
                    {t.s('editMin')}
                </Button>

                {/* remove */}
                <Button 
                    data-button='remove'
                    variant='outline'
                    title={t.s('remove')}
                    onClick={onRemoveClick}>
                    <Icon name='trash' />
                </Button>
            </>) : null}
        </div>
    )
}