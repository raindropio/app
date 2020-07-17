import s from './view.module.styl'
import React from 'react'
import t from '~t'
import Button from '~co/common/button'

export default class BookmarksFooterView extends React.PureComponent {
    loadMore = (e)=>{
        e.preventDefault()
        this.props.actions.nextPage(this.props.spaceId)
    }

    onFullClick = ()=>{
        this.props.events.onCollectionClick({ _id: parseInt(this.props.spaceId) })
    }

    render() {
        const { status, compact, count, compactLimit, isSearching } = this.props
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
                if (count)
                    content = `${count} ${t.s('bookmarks')} ${isSearching ? t.s('found').toLowerCase() : ''}`
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
            (compact && count > compactLimit))
            content = (
                <Button 
                    variant='flat'
                    data-block
                    onClick={this.onFullClick}>
                    {t.s('more')}&hellip;
                </Button>
            )

        if (!content) return null

        return (
            <div className={s.footer}>
                {content}
            </div>
        )
    }
}