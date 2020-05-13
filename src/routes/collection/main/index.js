import React from 'react'

import Main from '~co/screen/splitview/main'
import Header from './header'
import Content from './content'

export default function CollectionsMain(props) {
    return (
        <Main>
            <Header {...props} />
            <Content {...props} />
        </Main>
    )
}