import s from './item.module.styl'
import React from 'react'
import { humanNumber } from '~modules/strings'

import { Link } from 'react-router-dom'
import { Item, ItemTitle, ItemIcon, ItemInfo } from '~co/common/list'
import CollectionIcon from '../item/icon'
import SafeHtml from '~co/common/safeHtml'

function CollectionSearchItem({ title, cover, _id, count, search }) {
    let highlighted = title.replace(new RegExp(`(${search})`, 'i'), '<em>$1</em>')

    return (
        <Item className={s.item}>
            <ItemIcon className={s.icon}>
                <CollectionIcon
                    cover={cover}
                    _id={_id} />
            </ItemIcon>

            <ItemTitle>
                <SafeHtml className={s.title}>{highlighted}</SafeHtml>
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

export default React.memo(CollectionSearchItem)