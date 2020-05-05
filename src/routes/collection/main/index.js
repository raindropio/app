import React from 'react'
import { withSearch } from '~modules/router'

import Main, { Header, Content } from '~co/screen/splitview/main'
import Bookmarks from '~co/bookmarks/items'

function CollectionsMain({ match }){
    return (
        <Main>
            <Header></Header>
            <Content>
                <Bookmarks cid={match.params.cid} />
            </Content>
        </Main>
    )
}

export default withSearch(CollectionsMain)