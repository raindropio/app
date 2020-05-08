import React from 'react'
import t from '~t'

export default class BookmarksFooterView extends React.PureComponent {
    loadMore = (e)=>{
        e.preventDefault()
        this.props.actions.nextPage(this.props.cid)
    }

    render() {
        const { status } = this.props
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
                content = (
                    <a className='button default' onClick={this.loadMore}><b>{t.s('more')}</b></a>
                )
                break
        }

        return (
            <div className='loadMore'>
                {content}
            </div>
        )
    }
}