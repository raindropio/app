import React from 'react'
import { Content } from '~co/screen/splitview/main'
import Bookmarks from '~co/bookmarks'

export default class CollectionsMainContent extends React.Component {
    events = {
        onTagClick: (tagName)=>{
            this.props.onSearch('#'+tagName, 'append')
        },

        onItemClick: (item)=>{
            const { reader } = this.props
            
            if (reader.bookmark){
                this.props.onReader({ ...reader, bookmark: item._id })
                return true
            } else if (item.type != 'link'){
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
        const { cid, search, full, reader: { bookmark } } = this.props

        return (
            <Content>
                <Bookmarks 
                    cid={cid}
                    search={search}
                    full={full}
                    activeId={bookmark && parseInt(bookmark)}
                    events={this.events} />
            </Content>
        )
    }
}