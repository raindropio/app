import React from 'react'

import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header from './header'
import Content from './content'
import Events from './events'

export default ({ location: { search } })=>{
    const props = Object.fromEntries(new URLSearchParams(search))||{}

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