import React from 'react'

import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header from './header'
import Bookmark from '~co/bookmarks/edit'

export default ({ location: { search } })=>{
    const { url, title='' } = Object.fromEntries(new URLSearchParams(search))||{}

    return (
        <Protected redirect>
            <Screen>
                <Header />
    
                <Bookmark 
                    _id={url}
                    blank={{ title }}
                    autoFocus='title' />
            </Screen>
        </Protected>
    )
}