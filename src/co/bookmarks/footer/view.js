import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'

export default class BookmarksFooterView extends React.PureComponent {
    loadMore = (e)=>{
        e.preventDefault()
        this.props.actions.nextPage(this.props.cid)
    }

    render() {
        const { status, compact, cid } = this.props
        let content = null

        switch(status.nextPage) {
            case 'loading':
                content = (
                    <div className='subHeadLabel'>{t.s('loading')}&hellip;</div>
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
                        <a className='button default' onClick={this.loadMore}><b>{t.s('more')}</b></a>
                    )
                break
        }

        if (compact && status.main == 'loaded' && status.nextPage != 'noMore')
            content = (
                <Link to={`/collection/${cid}full`} className='button default' href='/'><b>{t.s('showAll')}</b></Link>
            )

        return (
            <div className='loadMore'>
                {content}
            </div>
        )
    }
}