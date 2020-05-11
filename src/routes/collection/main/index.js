import React from 'react'
import { withSearch } from '~modules/router'

import Main from '~co/screen/splitview/main'
import Header from './header'
import Content from './content'

function CollectionsMain(props){
    return (
        <Main>
            <Header {...props} />
            <Content {...props} />
        </Main>
    )
}

export default withSearch(CollectionsMain)