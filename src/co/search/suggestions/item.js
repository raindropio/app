import s from './item.module.styl'
import React from 'react'
import { Item, ItemIcon, ItemTitle, ItemInfo } from '~co/common/list'
import Icon from '~co/common/icon'
import useItemInfo from './useItemInfo'

export default function SuggestionItem({ item, className='', ...etc}) {
    const { icon, title, info, token } = useItemInfo(item)

    return (
        <Item 
            className={s.item+' '+className}
            data-token={token}
            data-id={item._id}
            {...etc}>
            {typeof icon == 'object' ? icon : (
                <ItemIcon className={s.icon}>
                    <Icon 
                        name={icon}
                        size='micro' />
                </ItemIcon>
            )}

            <ItemTitle>
                {title}
            </ItemTitle>

            <ItemInfo>
                {info}
            </ItemInfo>
        </Item>
    )
}