import s from './item.module.styl'
import React, { forwardRef } from 'react'
import { Item, ItemIcon, ItemTitle, ItemInfo } from '~co/common/list'
import Icon from '~co/common/icon'
import useItemInfo from './useItemInfo'

function SuggestionItem({ item, className='', forwardedRef, ...etc}) {
    const { icon, title, info, token } = useItemInfo(item)

    return (
        <Item 
            ref={forwardedRef}
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

export default forwardRef((props, ref) => {
    return <SuggestionItem {...props} forwardedRef={ref} />
})