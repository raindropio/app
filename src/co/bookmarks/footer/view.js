import s from './view.module.styl'
import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class BookmarksFooterView extends React.PureComponent {
    loadMore = (e)=>{
        e.preventDefault()
        this.props.actions.nextPage(this.props.spaceId)
    }

    render() {
        const { status, compact, more, spaceId, isSearching } = this.props
        let content = null

        switch(status.nextPage) {
            case 'loading':
                content = (
                    <div className={s.loading}>{t.s('loading')}&hellip;</div>
                )
                break

            case 'error':
                content = (
                    <span>
                        {t.s('server')} <a onClick={this.loadMore}>{t.s('tryAgain')}</a>
                    </span>
                )
                break

            case 'noMore':
                break

            default:
                if (status.main == 'loaded')
                    content = (
                        <Button 
                            data-block
                            variant='outline' 
                            onClick={this.loadMore}>
                            {t.s('more')}&hellip;
                        </Button>
                    )
                break
        }

        if ((compact && status.main == 'loaded' && status.nextPage != 'noMore') ||
            (compact && more))
            content = (
                <Link 
                    component={Button}
                    to={`/space/${spaceId}full`}
                    variant='flat'
                    data-block
                    href='/'>
                    {t.s('more')}&hellip;
                </Link>
            )

        return (
            <div className={s.footer}>
                {content}
            </div>
        )
    }
}