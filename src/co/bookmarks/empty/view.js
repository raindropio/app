import React from 'react'
import t from '~t'
import environment from '~modules/environment'
import config from '~config'

import { Link } from 'react-router-dom'
import Preloader from '~co/common/preloader'
import SuperImg from '~co/common/superImg'
import Icon from '~co/common/icon'

export default class BookmarksEmptyView extends React.PureComponent {
    reload = (e)=>{
        e.preventDefault()
        this.props.actions.reload(this.props.cid)
    }

    searchEverywhere = ()=>{

    }

    render() {
        const { status, cid, searchEmpty } = this.props
        let content = null

        switch(status.main) {
            case 'empty':{
				const _id = parseInt(cid)

                switch(true) {
                    //trash
                    case (_id==-99):
                        content = (
                            <div>
                                <Icon name='trash' className='svgIcon-size-60' style={{opacity: '.3'}} />
                                <h2 className='headLabel'>{t.s('trashEmpty')}</h2>
                            </div>
                        )
                    break

                    //search empty
                    case (!searchEmpty):
                        content = (
                            <div>
                                <Icon name='search' className='svgIcon-size-60' style={{opacity: '.3'}} />
                                <h2 className='headLabel'>{t.s('nothingFound')}</h2>
                                {_id > 0 && (
                                    <p className='subHeadLabel'>
                                        <a href='' onClick={this.searchEverywhere}>{t.s('defaultCollection-0')} {t.s('everywhere').toLowerCase()}</a>
                                    </p>
                                )}
                            </div>
                        )
                    break

                    //noBookmarks
                    default:
                        content = (
                            <div>
                                <SuperImg src='empty/no_items.png' height='154' />
                                <h2 className='headLabel'>{t.s('noBookmarks')}</h2>
                                <p className='subHeadLabel'>
                                    {t.s('noItemsTip')}
                                </p>
        
                                <br/>{environment.isClipper() ? null : <a className='button active' href={config.links.download}>{t.s('install') + ' ' + t.s('browserExtension').toLowerCase()}</a>}
                                <br/><Link className='button active' to='/settings/import' target='_blank'>{t.s('importBookmarks')}&nbsp;{t.s('elements2')}</Link>
        
                                {parseInt(cid)>0?<p className='subHeadLabel'>{t.s('importSuccessInfo')}</p>:null}
                            </div>
                        )
                    break
                }
            }break

            case 'notFound':
                content = (
                    <div>
                        <SuperImg src='empty/no_items.png' height='154' />
                        <h2 className='headLabel'>{t.s('removeCollectionSuccess')}</h2>
                        <p className='subHeadLabel'>
                            {t.s('or')} {t.s('nothingFound').toLowerCase()}
                        </p>

                        <br/>

                        <p className='subHeadLabel'>
							<Link to='/'>{t.s('goHome')}</Link>
                        </p>
                    </div>
                )
                break

            case 'error':
                content = (
                    <div>
						<SuperImg src='empty/error.png' className='animation-flying' height='144' />
						<h2 className='headLabel'>{t.s('error')}</h2>
						<p className='subHeadLabel'>
							<Link to='/'>{t.s('goHome')}</Link>,&nbsp;
							<a onClick={this.reload}>{t.s('refresh')}</a>
						</p>
					</div>
                )
                break

            default:
                content = (
                    <Preloader/>
                )
                break
        }

        return (
            <div className='elements-empty'>
                {content}
            </div>
        )
    }
}