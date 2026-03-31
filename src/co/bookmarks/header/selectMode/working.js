import React from 'react'
import t from '~t'
import _ from 'lodash'

import Header, { Title } from '~co/common/header'
import CollectionIcon from '~co/collections/item/icon'

export default class BookmarksHeaderSelectModeLoading extends React.Component {
    static defaultProps = {
        selectMode: {}
    }
    
    strings = {
        move: t.s('move'),
        important: t.s('addToFavorites'),
        importantRemove: t.s('removeFromFavorites'),
        screenshot: t.s('clickToMakeScreenshot'),
        removeTags: t.s('removeTags'),
        reparse: t.s('refreshPreview'),
        remove: t.s('remove')
    }

    render() {
        const { selectMode: { working } } = this.props

        return (
            <Header>
                <CollectionIcon loading={true} />

                <Title>
                    {this.strings[working] || t.s('loading')}…
                </Title>
            </Header>
        )
    }
}