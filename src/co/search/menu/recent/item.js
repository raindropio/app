import s from './item.module.styl'
import React, { forwardRef } from 'react'
import { Item, ItemIcon, ItemTitle, ItemInfo } from '~co/common/list'
import Icon from '~co/common/icon'
import { ShortDate } from '~modules/format/date'

function RecentItem({ item: { query, date }, forwardedRef, ...etc }) {
    return (
        <Item 
            ref={forwardedRef}
            {...etc}>
            <ItemIcon className={s.icon}>
                <Icon name='search' />
            </ItemIcon>

            <ItemTitle>
                {query}
            </ItemTitle>

            <ItemInfo>
                <ShortDate date={date} />
            </ItemInfo>
        </Item>
    )
}

export default forwardRef((props, ref) => {
    return <RecentItem {...props} forwardedRef={ref} />
})