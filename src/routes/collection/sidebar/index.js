import React from 'react'
import t from '~t'
import { withSearch } from '~modules/router'

import Icon from '~co/common/icon'
import Sidebar, { Header, Content } from '~co/screen/splitview/sidebar'
import CollectionsTree from '~co/collections/items'
import FiltersTree from '~co/filters/tree'
import Profile from './profile'

class CollectionsSidebar extends React.Component {
    tree = React.createRef()

    events = {}

    onCreateClick = (e)=>{
        return this.tree.current.createNewCollection(e)
    }

    render() {
        const { match } = this.props

        let activeId = match.params.cid
        if (activeId=='0' && match.params.search)
            activeId = match.params.search

        return (
            <Sidebar>
                <Header title={<Profile />}>
                    <a 
                        href=''
                        className='button flat'
                        title={`${t.s('createNewCollection')}\nShift+click: ${t.s('createSubFolder').toLowerCase()}`}
                        onClick={this.onCreateClick}>
                        <b><Icon name='new_collection' /></b>
                    </a>
                </Header>

                <Content>
                    <FiltersTree
                        uriPrefix='/collection/'
                        activeId={activeId}>
                        {additionals=>
                            <CollectionsTree 
                                ref={this.tree}
                                uriPrefix='/collection/'
                                activeId={activeId}
                                events={this.events}
                                additionals={additionals} />
                        }
                    </FiltersTree>
                </Content>
            </Sidebar>
        )
    }
}

export default withSearch(CollectionsSidebar)