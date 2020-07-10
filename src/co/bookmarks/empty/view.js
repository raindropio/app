import styles from './view.module.styl'
import React from 'react'
import t from '~t'

import { Link } from 'react-router-dom'
import IllustrationNo from './no.svg?asis'
import IllustrationSearch from './search.svg?asis'
import IllustrationError from './error.svg?asis'

export default class BookmarksEmptyView extends React.PureComponent {
    reload = (e)=>{
        e.preventDefault()
        this.props.actions.reload(this.props.spaceId)
    }

    searchEverywhere = ()=>{

    }

    render() {
        const { status, spaceId, searchEmpty, compact } = this.props
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
                        content = (
                            <div>
                                <IllustrationSearch />
                                <h2>{t.s('nothingFound')}</h2>
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
							<Link to='/space/0'>{t.s('allBookmarks')}</Link>
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
							<a onClick={this.reload}>{t.s('refresh')}</a>
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