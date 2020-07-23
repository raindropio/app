import React from 'react'
import { Content } from '~co/screen/splitview/main'
import Bookmarks from '~co/bookmarks'

export default class SpaceMainContent extends React.Component {
    events = {
        onTagClick: (tagName)=>{
            this.props.onSearch(
                tagName.includes(' ') ? `"#${tagName}"` : `#${tagName}`,
                'append'
            )
        },

        onSearch: (search)=>{
            this.props.onSearch(search, 'current')
        },

        onCollectionClick: (collection)=>{
            const spaceId = parseInt(this.props.spaceId)
            this.props.onSpaceChange(collection._id, { full: true, search: !spaceId || spaceId==collection._id })
        },

        onItemClick: (item)=>{
            const { reader } = this.props
            
            if (reader.bookmark){
                this.props.onReader({ ...reader, bookmark: item._id })
                return true
            } else if (item.type!='link') {
                this.events.onItemPreviewClick(item)
                return true
            }
        },

        onItemPreviewClick: (item, tab='')=>{
            this.props.onReader({
                bookmark: item._id,
                tab
            })
        },

        onItemEditClick: (item)=>{
            this.props.onReader({ bookmark: item._id, tab: 'edit' })
        }
    }

    render() {
        const { spaceId, search, full, reader: { bookmark } } = this.props

        return (
            <Content>
                <Bookmarks 
                    spaceId={spaceId}
                    search={search}
                    full={full}
                    activeId={bookmark && parseInt(bookmark)}
                    events={this.events} />
            </Content>
        )
    }
}