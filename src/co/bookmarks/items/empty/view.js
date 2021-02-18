import styles from './view.module.styl'
import React from 'react'
import { Link } from 'react-router-dom'
import t from '~t'
import config from '~config'

import IllustrationNo from './no.svg?component'
import IllustrationSearch from './search.svg?component'
import IllustrationError from './error.svg?component'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class BookmarksEmptyView extends React.PureComponent {
    refresh = (e)=>{
        e.preventDefault()
        this.props.actions.refresh(this.props.spaceId)
    }

    render() {
        const { status, spaceId, searchEmpty, compact, collection: { title }, getLink } = this.props
        let content = null

        if (spaceId == -101) return null

        switch(status.main) {
            case 'empty':{
				const _id = parseInt(spaceId)

                switch(true) {
                    //trash
                    case (_id==-99):
                        content = (
                            <div>
                                <h2>{t.s('trashEmpty')}</h2>
                            </div>
                        )
                    break

                    //search nothing found
                    case (!searchEmpty):
                        if (!compact)
                            content = (
                                <div>
                                    <IllustrationSearch />
                                    <h2>{t.s('nothingFound')} {t.s('in')} {title}</h2>
                                </div>
                            )
                    break

                    //noBookmarks
                    default:
                        if (!compact)
                            content = (
                                <div>
                                    <IllustrationNo />

                                    <h2>{t.s('noBookmarks')}</h2>
                                    <p>
                                        {t.s('noItemsTip')}
                                    </p>

                                    <br />

                                    <Button 
                                        as='a'
                                        href={config.links.download}
                                        target='_blank'
                                        variant='outline'>
                                        <Icon name='open' size='micro' />
                                        {t.s('install')} {t.s('browserExtension').toLowerCase()}
                                    </Button>

                                    <br /><br />

                                    <Button
                                        as={Link}
                                        to='/settings/import'
                                        variant='outline'>
                                        <Icon name='cloud' size='micro' />
                                        {t.s('import')} {t.s('bookmarks')}
                                    </Button>
                                </div>
                            )
                    break
                }
            }break

            case 'notFound':
                content = (
                    <div>                        
                        <h2>{t.s('removeCollectionSuccess')}</h2>
                        <p>
                            {t.s('or')} {t.s('nothingFound').toLowerCase()}
                        </p>

                        <br/>

                        <p>
							<Link to={getLink({ _id: 0 })}>{t.s('allBookmarks')}</Link>
                        </p>
                    </div>
                )
                break

            case 'error':
                content = (
                    <div>
                        {!compact && (<IllustrationError />)}

						<h2>{t.s('error')}</h2>
						<p>
							<a href='' onClick={this.refresh}>{t.s('refresh')}</a>
						</p>
					</div>
                )
                break
        }

        return (
            <div className={styles.empty}>
                {content}
            </div>
        )
    }
}