import React from 'react'
import CollectionIcon from '~co/collections/item/icon'

import Sort from './sort'
import View from './view'
import More from './more'

export default class BookmarksHeaderView extends React.PureComponent {
    render() {
        const { collection } = this.props

        return (
            <div className='elements-header'>
                <div className='header'>
                    <div className='c-icon'>
                        <CollectionIcon
                            _id={collection._id}
                            cover={collection.cover} />
                    </div>

                    <div className='title'>
                        {collection.title}
                    </div>

                    <Sort {...this.props} />
                    <View {...this.props} />
                    <More {...this.props} />
                </div>
            </div>
        )
    }
}