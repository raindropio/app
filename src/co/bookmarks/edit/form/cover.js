import React from 'react'
import Cover from '~co/bookmarks/item/cover'
import Icon from '~co/common/icon'
import ImagePicker from '~co/picker/image'

export default class BookmarkEditFormCover extends React.Component {
    state = {
        modal: false
    }

    onModalOpen = (e)=>{
        e.preventDefault()
        this.setState({ modal: true })
    }

    onModalClose = ()=>
        this.setState({ modal: false })

    render() {
        const { item: { cover, link, media } } = this.props

        return (
            <div>
                <a 
                    href=''
                    className='edit-cover'
                    onClick={this.onModalOpen}>
                    <Cover 
                        cover={cover}
                        link={link}
                        view='list' />

                    <span className='edit-cover-more'>
                        <Icon name='arrow' />
                    </span>
                </a>

                {this.state.modal && (
                    <ImagePicker
                        items={media}
                        onClose={this.onModalClose} />
                )}
            </div>
        )
    }
}