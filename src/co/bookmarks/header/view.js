import React from 'react'
import CollectionIcon from '~co/collections/item/icon'
import Icon from '~co/common/icon'

export default class BookmarksHeaderView extends React.PureComponent {
    render() {
        const { collection } = this.props

        return (
            <>
                <div className='elements-header'>
                    <div className='c-icon'>
                        <CollectionIcon
                            _id={collection._id}
                            cover={collection.cover} />
                    </div>

                    <div className='title'>
                        {collection.title}
                    </div>

                    <a href='' className='button default'>
                        <Icon name={'view_'+collection.view} />
                    </a>
                </div>

                <div className='elements-header-border' />
            </>
        )
    }
}