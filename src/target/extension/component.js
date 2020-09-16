import React from 'react'
import _ from 'lodash'
import browser from './browser'
import { connect } from 'react-redux'
import { makeBookmarksLastChange } from '~data/selectors/bookmarks'

class ExtensionComponent extends React.Component {
    componentDidUpdate(prev) {
        const { bookmarksChange } = this.props

        if (prev.bookmarksChange != bookmarksChange)
            this.onBookmarksChange()
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