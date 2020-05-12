import React from 'react'
import t from '~t'
import CollectionIcon from '~co/collections/item/icon'

import Sort from './sort'
import View from './view'
import More from './more'

export default class BookmarksHeaderView extends React.PureComponent {
    render() {
        const { collection, isSearching } = this.props

        let title = collection.title
        if (collection._id == 0 && isSearching)
            title = t.s('defaultCollection-0')

        return (
            <div className='elements-header'>
                <div className='header'>
                    {collection._id > 0 && (
                        <div className='c-icon'>
                            <CollectionIcon
                                _id={collection._id}
                                cover={collection.cover} />
                        </div>
                    )}

                    <div className='title'>
                        {title}
                    </div>
                    <More {...this.props} />

                    <div className='space' />

                    <Sort {...this.props} />
                    <View {...this.props} />
                </div>
            </div>
        )
    }
}