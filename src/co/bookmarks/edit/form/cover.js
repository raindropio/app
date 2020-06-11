import React from 'react'
import Cover from '~co/bookmarks/item/cover'
import Icon from '~co/common/icon'

export default class BookmarkEditFormCover extends React.Component {
    render() {
        const { item: { cover, link } } = this.props

        return (
            <div>
                <a href='' className='edit-cover'>
                    <Cover 
                        cover={cover}
                        link={link}
                        view='list' />

                    <span className='edit-cover-more'>
                        <Icon name='arrow' />
                    </span>
                </a>
            </div>
        )
    }
}