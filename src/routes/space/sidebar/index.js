import React from 'react'
import t from '~t'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { FirstAction } from '~co/common/header'
import Sidebar, { Header, Content } from '~co/screen/splitview/sidebar'
import Collections from '~co/collections/items'
import FiltersTags from './filters_tags'
import Profile from './profile'

export default class CollectionsSidebar extends React.Component {
    //collections
    collections = React.createRef()

    collectionsEvents = {
        
    }

    onCreateCollectionClick = (e)=>{
        return this.collections.current.createNewCollection(e)
    }

    //filters
    filtersEvents = {
        onItemClick: query=>
            this.props.onSearch(query),

        onItemAppendClick: query=>
            this.props.onSearch(query, 'append'),
    }

    render() {
        const { spaceId, search } = this.props

        let activeId = spaceId
        if (activeId=='0' && search)
            activeId = search

        return (
            <Sidebar>
                <Header>
                    <FirstAction style={{flex: 1}}><Profile /></FirstAction>
                    
                    <Button 
                        title={`${t.s('createNewCollection')}\nShift+click: ${t.s('createSubFolder').toLowerCase()}`}
                        onClick={this.onCreateCollectionClick}>
                        <Icon name='add' />
                    </Button>
                </Header>

                <Content>
                    <FiltersTags
                        activeId={search}
                        events={this.filtersEvents}>
                        {(customRows, customRowRenderer)=>
                            <Collections 
                                ref={this.collections}
                                events={this.collectionsEvents}
                                
                                uriPrefix='/space/'
                                activeId={activeId}

                                customRows={customRows}
                                customRowRenderer={customRowRenderer} />
                        }
                    </FiltersTags>
                </Content>
            </Sidebar>
        )
    }
}