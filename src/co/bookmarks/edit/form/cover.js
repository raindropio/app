import React from 'react'
import Cover from '~co/bookmarks/item/cover'

export default class BookmarkEditFormCover extends React.Component {
    render() {
        const { item: { cover, link } } = this.props

        return (
            <div className='edit-cover'>
                <Cover 
                    cover={cover}
                    link={link}
                    view='list' />
            </div>
        )
    }
}