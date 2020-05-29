import React from 'react'
import t from '~t'

import Icon from '~co/common/icon'
import Sidebar, { Header, Content } from '~co/screen/splitview/sidebar'
import CollectionsTree from '~co/collections/items'
import Filters from '~co/filters/items/custom'
import Profile from './profile'

export default class CollectionsSidebar extends React.Component {
    tree = React.createRef()

    filtersEvents = {
        onItemClick: query=>
            this.props.onSearch(query),

        onItemAppendClick: query=>
            this.props.onSearch(query, 'append'),
    }

    onCreateClick = (e)=>{
        return this.tree.current.createNewCollection(e)
    }

    render() {
        const { spaceId, search } = this.props

        let activeId = spaceId
        if (activeId=='0' && search)
            activeId = search

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
                    <Filters
                        activeId={search}
                        events={this.filtersEvents}>
                        {(customRows, customRowRenderer)=>
                            <CollectionsTree 
                                ref={this.tree}
                                
                                uriPrefix='/space/'
                                activeId={activeId}

                                customRows={customRows}
                                customRowRenderer={customRowRenderer} />
                        }
                    </Filters>
                </Content>
            </Sidebar>
        )
    }
}