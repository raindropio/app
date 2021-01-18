import React from 'react'
import Add from '~co/bookmarks/add'

export default class HeaderAdd extends React.Component {
    onEdit = item=>
        this.props.history.push(
            this.props.getLink({
                _id: item.collectionId,
                full: true,
                
                bookmark: item._id,
                tab: 'edit'
            })
        )
    
    render() {
        const { _id, access } = this.props

        if (_id == -99 || !access || access.level < 3)
            return null

        return (
            <Add 
                autoFocus={true}
                spaceId={_id}
                onEdit={this.onEdit} />
        )
    }
}