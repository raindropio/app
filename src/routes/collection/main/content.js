import React from 'react'
import { Content } from '~co/screen/splitview/main'
import Bookmarks from '~co/bookmarks/items'

function CollectionsMainContent({ match }){
    return (
        <Content>
            <Bookmarks cid={match.params.cid} />
        </Content>
    )
}

export default CollectionsMainContent