import React from 'react'
import browser from '~target/extension/browser'
import { connect } from 'react-redux'
import { makeBookmarksLastChange } from '~data/selectors/bookmarks'

class App extends React.Component {
    componentDidMount() {
        //very important to bind to window insted of document, to be sure that it happen after all other event listeners
        window.addEventListener('click', this.onClickExternalLink)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClickExternalLink)
    }

    componentDidUpdate(prev) {
        const { bookmarksChange } = this.props

        if (prev.bookmarksChange != bookmarksChange)
            this.onBookmarksChange()
    }

    onClickExternalLink = (e)=>{
        if (e.defaultPrevented) return

        //ignore non links
        const { target: a } = e
        if (a.tagName != 'A') return
        
        //ignore empty or target blank
        const { href='', target } = a
        if (!href || target=='_blank') return

        //ignore own link
        let host, protocol
        try{
            const parsed = new URL(href)
            host = parsed.host
            protocol = parsed.protocol
        } catch(e) {}
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

export default connect(
    ()=>{
        const getBookmarksLastChange = makeBookmarksLastChange()

        return (state)=>({
            bookmarksChange: getBookmarksLastChange(state)
        })
    }
)(App)