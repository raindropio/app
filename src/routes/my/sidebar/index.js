import React, { useRef } from 'react'
import t from '~t'
import { useParams } from 'react-router-dom'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Sidebar, { Header, Content } from '~co/screen/splitview/sidebar'
import Collections from '~co/collections/items'
import FiltersTags from './filters_tags'
import Profile from './profile'
import Upgrade from './upgrade'

export default function PageMySidebar() {
    const { cId, search } = useParams()
    const collections = useRef(null)

    let activeId = parseInt(cId)
    if (activeId=='0' && search)
        activeId = search

    return (
        <Sidebar>
            <Header>
                <Profile />
                
                <Button 
                    title={`${t.s('createNewCollection')}\nShift+click: ${t.s('createSubFolder').toLowerCase()}`}
                    onClick={collections.current?.createNewCollection}>
                    <Icon name='add' />
                </Button>
            </Header>

            <Content>
                <FiltersTags activeId={activeId}>
                    {(customRows, customRowRenderer)=>
                        <Collections 
                            ref={collections}
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