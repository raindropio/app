import React from 'react'
import t from '~t'

export default class BookmarksItemsFooter extends React.PureComponent {
    loadMore = (e)=>{
        e.preventDefault()
        this.props.actions.nextPage(this.props.cid)
    }

    render() {
        const { status } = this.props

        if (status.main != 'loaded')
            return null

        switch(status.nextPage) {
            case 'loading':
                return (
                    <div className='loadMore'>
                        <div className='subHeadLabel'>{t.s('loading')}&hellip;</div>
                    </div>
                )

            case 'error':
                return (
                    <div className='loadMore'>
                        {t.s('server')} <a onClick={this.loadMore}>{t.s('tryAgain')}</a>
                    </div>
                )

            case 'noMore':
                return null

            default:
                return (
                    <div className='loadMore'>
                        <a className='button default' onClick={this.loadMore}><b>{t.s('more')}</b></a>
                    </div>
                )
        }
    }
}