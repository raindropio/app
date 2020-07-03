import React from 'react'
import Header, { Title } from '~co/common/header'
import CollectionIcon from '~co/collections/item/icon'

export default function CollectionSharingTitleView({ cover, _id, title }) {
    return (
        <Header>
            <CollectionIcon
                cover={cover}
                _id={_id} />
            <Title>{title}</Title>
        </Header>
    )
}