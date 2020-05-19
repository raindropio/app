import React from 'react'
import t from '~t'
import getLinks from '~data/modules/bookmarks/getLinks'

import { Link } from 'react-router-dom'
import CollectionIcon from '~co/collections/item/icon'
import SelectAll from './selectAll'
import Sort from './sort'
import View from './view'
import More from './more'

export default class BookmarksHeaderView extends React.PureComponent {
    handlers = {
        onSelectAllClick: (e)=>{
            e && e.preventDefault && e.preventDefault()
            this.props.actions.selectAll(this.props.cid)
        },

        onOpenAllClick: (e)=>{
            e && e.preventDefault && e.preventDefault()

            getLinks(this.props.cid).forEach(link => window.open(link))
        },

        onRemoveClick: ()=>{
            if (confirm(t.s('areYouSure')))
                this.props.collectionsActions.oneRemove(this.props.collection._id)
        },

        onSortChange: (sort)=>{
            this.props.actions.changeSort(this.props.cid, sort)
        },

        onViewChange: (view)=>{
            this.props.collectionsActions.oneChangeView(this.props.cid, view)
        }
    }

    render() {
        const { collection, isSearching, status, compact } = this.props

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
                                cover={collection.cover}
                                loading={status.main=='loading'} />
                        </div>
                    )}

                    <div className='title'>
                        {compact ? <Link to={'/collection/'+collection._id+'full'}>{title}</Link> : title}
                    </div>
                    <More {...this.props} {...this.handlers} />

                    <div className='space' />
                        
                    <Sort {...this.props} {...this.handlers} />
                    <View {...this.props} {...this.handlers} />
                    <SelectAll {...this.props} {...this.handlers} />
                </div>
            </div>
        )
    }
}