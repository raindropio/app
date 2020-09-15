import React from 'react'
import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header from './header'

function Clipper(props) {
    return (
        <Protected redirect>
            <Screen>
                <Header {...props} />
            </Screen>
        </Protected>
    )
}

export default Clipper