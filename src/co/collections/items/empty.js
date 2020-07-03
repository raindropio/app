import React from 'react'
import { Item } from '~co/common/list'

export default function CollectionsItemsEmpty() {
    return (
        <div>
            <Item disabled>
                &mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;
            </Item>
            <Item disabled>
                &mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;
            </Item>
            <Item disabled>
                &mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;
            </Item>
        </div>
    )
}