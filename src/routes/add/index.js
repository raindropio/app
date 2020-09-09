import React from 'react'
import { connect } from 'react-redux'
import { getDraftStatus } from '~data/selectors/bookmarks'

import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header from './header'
import Content from './content'
import Events from './events'

/*
    ?link=&title=
*/
function Add(props) {
    return (
        <Protected redirect>
            <Screen>
                <Header {...props} />
                <Content {...props} />
                <Events {...props} />
            </Screen>
        </Protected>
    )
}

export default connect(
    (state, { location: { search } })=>{
        const item = Object.fromEntries(new URLSearchParams(search))||{}

        return {
            status: getDraftStatus(state, item.link),
            item
        }
    }
)(Add)