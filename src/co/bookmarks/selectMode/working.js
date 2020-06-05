import React from 'react'
import t from '~t'
import _ from 'lodash'
import CollectionIcon from '~co/collections/item/icon'

export default class BookmarksHeaderSelectModeLoading extends React.Component {
    static defaultProps = {
        selectMode: {}
    }
    
    strings = {
        move: t.s('move'),
        important: _.capitalize(t.s('to')) + ' ' + t.s('favoriteSites').toLowerCase(),
        importantRemove: t.s('remove')+' '+t.s('from')+' '+t.s('favoriteSites').toLowerCase(),
        screenshot: t.s('clickToMakeScreenshot'),
        removeTags: t.s('remove')+' '+t.s('tags').toLowerCase(),
        reparse: t.s('refresh')+' '+t.s('preview').toLowerCase(),
        remove: t.s('remove')
    }

    render() {
        const { selectMode: { working } } = this.props

        return (
            <div className='elements-header select-mode'>
                <div className='header'>
                    <div className='c-icon'>
                        <CollectionIcon
                            loading={true} />
                    </div>
    
                    <div className='title'>
                        {this.strings[working] || t.s('loading')}…
                    </div>
                </div>
            </div>
        )
    }
}