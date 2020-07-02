import s from './item.module.styl'
import React from 'react'
import { humanNumber } from '~modules/strings'

import { Link } from 'react-router-dom'
import { Item, ItemTitle, ItemIcon, ItemInfo } from '~co/common/list'
import CollectionIcon from '../item/icon'

export default function CollectionSearchItem({ title, cover, _id, count }) {
    return (
        <Item className={s.item}>
            <ItemIcon className={s.icon}>
                <CollectionIcon
                    cover={cover}
                    _id={_id} />
            </ItemIcon>

            <ItemTitle>
                {title}
            </ItemTitle>

            {count ? (
                    <ItemInfo className={s.count}>
                        {humanNumber(count)}
                    </ItemInfo>
                ) : null}

            <Link 
                className={s.link}
                to={`/space/${_id}`} />
        </Item>
    )
}