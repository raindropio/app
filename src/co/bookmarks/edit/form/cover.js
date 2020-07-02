import styles from './cover.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { oneCoverUpload } from '~data/actions/bookmarks'

import Cover from '~co/bookmarks/item/cover'
import Icon from '~co/common/icon'
import ImagePicker from '~co/picker/image'

class BookmarkEditFormCover extends React.Component {
    state = {
        modal: false
    }

    onModalOpen = (e)=>{
        e.preventDefault()
        this.setState({ modal: true })
    }

    handlers = {
        onClose: ()=>
            this.setState({ modal: false }),

        onLink: async(link)=>{
            let media = [...this.props.item.media]
            let coverId = media.findIndex(item=>item.link == link)

            if (coverId == -1){
                media = [ ...media, { link } ]
                coverId = media.length - 1
            }

            this.props.onChange({
                coverId,
                media
            })
            this.props.onSubmit()
        },

        onScreenshot: async()=>{
            this.handlers.onLink('<screenshot>')
        },

        onFile: (file)=>
            new Promise((res, rej)=>
                this.props.oneCoverUpload(this.props.item._id, file, res, rej)
            )
    }

    render() {
        const { item: { cover, link, media } } = this.props

        return (
            <div>
                <a 
                    href=''
                    className={styles.cover}
                    title={t.s('changeIcon')}
                    onClick={this.onModalOpen}>
                    <Cover 
                        cover={cover}
                        link={link}
                        view='list' />

                    <span className={styles.more}>
                        <Icon name='arrow' />
                    </span>
                </a>

                {this.state.modal && (
                    <ImagePicker
                        items={media}
                        {...this.handlers} />
                )}
            </div>
        )
    }
}

export default connect(
	undefined,
	{ oneCoverUpload },
)(BookmarkEditFormCover)