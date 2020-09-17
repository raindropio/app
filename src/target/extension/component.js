import React from 'react'
import browser from './browser'
import { connect } from 'react-redux'
import { makeBookmarksLastChange } from '~data/selectors/bookmarks'

class ExtensionComponent extends React.Component {
    componentDidMount() {
        document.addEventListener('click', this.onClickExternalLink)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickExternalLink)
    }

    componentDidUpdate(prev) {
        const { bookmarksChange } = this.props

        if (prev.bookmarksChange != bookmarksChange)
            this.onBookmarksChange()
    }

    onClickExternalLink = (e)=>{
        //ignore non links
        const { target: a } = e
        if (a.tagName != 'A') return
        
        //ignore empty or target blank
        const { href='', target } = a
        if (!href || target=='_blank') return

        //ignore own link
        const { host, protocol } = new URL(href)
        if (host == location.host && protocol == location.protocol) return

        //update current tab
        e.preventDefault()
        e.stopPropagation()
        browser.tabs.update({ url: href })
        window.close()
    }

    onBookmarksChange = ()=>{
        browser.runtime.sendMessage(null, { type: 'BOOKMARKS_CHANGED' })
    }

    render() {
        return this.props.children
    }
}

export const Component = connect(
    ()=>{
        const getBookmarksLastChange = makeBookmarksLastChange()

        return (state)=>({
            bookmarksChange: getBookmarksLastChange(state)
        })
    }
)(ExtensionComponent)