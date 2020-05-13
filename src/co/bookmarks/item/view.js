import React from 'react'
import t from '~t'
import { ShortDate } from '~modules/format/date'

import SuperLink from '~co/common/superLink'
import Icon from '~co/common/icon'
import Cover from './cover'
import Tags from './tags'
import Path from './path'

export default class BookmarkItemView extends React.PureComponent {
    render() {
        const { link, title, excerpt, body, cover, domain, tags, type, view, access, created, reparse, collectionId, cid } = this.props
        const { active, selected, important, broken } = this.props
        const { onClick, onTagClick, onEditClick, onSelectClick, onImportantClick, onContextMenu, onKeyUp } = this.props

        return (
            <article className={`element ${active&&'active'} ${selected&&'checked'} ${important&&'important'} ${broken&&'broken'}`}>
                <Cover
                    src={cover}
                    link={link}
                    view={view} />

                <div className='about'>
                    <span className='title'>{title}</span>
                    <div>
                        <p className='description'>{excerpt}</p>
                        {body && <p className='description from-body'>{body}</p>}
                    </div>

                    <Tags 
                        tags={tags}
                        onTagClick={onTagClick} />

                    <div className='info-wrap'>
                        <div className='info info-domain'>
                            {cid != collectionId && <Path collectionId={collectionId} />}

                            {important && (
                                <div className='info-important'>
                                    <span className='info-img'>
                                        <Icon name='important' size='micro' />
                                    </span>
                                </div>
                            )}

                            {reparse && (
                                <div className='info-important'>
                                    <span className='info-img'>
                                        <Icon name='progress' size='micro' />
                                    </span>
                                </div>
                            )}

                            {type != 'link' && (
                                <div className='info-important'>
                                    <span className='info-img'>
                                        <Icon name={type} size='micro' />
                                    </span>
                                </div>
                            )}

                            <div className='info-domain'>
                                {domain}&nbsp; ·&nbsp; <ShortDate date={created}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='actions'>
                    <a 
                        href={link}
                        tabIndex='-1'
                        target='_blank'
                        className='button min default'
                        title={t.s('openInBrowser')}>
                        <b><Icon name='open' /></b>
                    </a>

                    {access.level >= 3 && (
                        <>
                            <span 
                                className='button min default'
                                onClick={onImportantClick}>
                                <b><Icon name={'like'+(important?'_active':'')} /></b>
                            </span>

                            <span 
                                className='button min default'
                                onClick={onEditClick}>
                                <b><Icon name='edit' /></b>
                            </span>

                            <span
                                className='button min default'
                                onClick={onContextMenu}
                                title={t.s('helpContextD')}>
                                <b><Icon name='more_horizontal' /></b>
                            </span>
                        </>
                    )}
                </div>

                {access.level >= 3 && (
                    <label
                        className={`selectElement ${selected ? 'active' : 'default'}`}
                        title={t.s('select')}>
                        <input type='checkbox' checked={selected} onChange={onSelectClick} />
                    </label>
                )}

                <SuperLink
					navPrefix='element'
                    href={link}
                    tabIndex={active ? '200' : '-1'}
					onClick={onClick}
                    onContextMenu={onContextMenu}
					onKeyUp={onKeyUp}
					className='permalink' />
            </article>
        )
    }
}