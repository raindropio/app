import React from 'react'
import t from '~t'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Sidebar, { Header, Content } from '~co/screen/splitview/sidebar'
import Collections from '~co/collections/items'
import FiltersTags from './filters_tags'
import Profile from './profile'
import Upgrade from './upgrade'

export default class MySidebar extends React.Component {
    //collections
    collections = React.createRef()

    onCreateCollectionClick = (e)=>{
        return this.collections.current.createNewCollection(e)
    }

    render() {
        const { _id, search, getLink } = this.props

        let activeId = parseInt(_id)
        if (activeId=='0' && search)
            activeId = search

        return (
            <Sidebar>
                <Header>
                    <Profile />
                    
                    <Button 
                        title={`${t.s('createNewCollection')}\nShift+click: ${t.s('createSubFolder').toLowerCase()}`}
                        onClick={this.onCreateCollectionClick}>
                        <Icon name='add' />
                    </Button>
                </Header>

                <Content>
                    <FiltersTags
                        activeId={search}
                        getLink={getLink}>
                        {(customRows, customRowRenderer)=>
                            <Collections 
                                ref={this.collections}
                                getLink={getLink}
                                activeId={activeId}

                                customRows={customRows}
                                customRowRenderer={customRowRenderer} />
                        }
                    </FiltersTags>
                </Content>

                <Upgrade />
            </Sidebar>
        )
    }
}