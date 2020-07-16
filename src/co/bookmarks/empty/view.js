import styles from './view.module.styl'
import React from 'react'
import t from '~t'

import IllustrationNo from './no.svg?asis'
import IllustrationSearch from './search.svg?asis'
import IllustrationError from './error.svg?asis'

export default class BookmarksEmptyView extends React.PureComponent {
    refresh = (e)=>{
        e.preventDefault()
        this.props.actions.refresh(this.props.spaceId)
    }

    onAllBookmarksClick = e => {
        e.preventDefault()
        this.props.events.onCollectionClick({ _id: 0 })
    }

    render() {
        const { status, spaceId, searchEmpty, compact, collection: { title } } = this.props
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
							<a href='' onClick={this.onAllBookmarksClick}>{t.s('allBookmarks')}</a>
                        </p>
                    </div>
                )
                break

            case 'error':
                content = (
                    <div>
                        <IllustrationError />

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