import s from './view.module.styl'
import React from 'react'
import { humanNumber } from '~modules/strings'

import { Item, ItemTitle, ItemInfo } from '~co/common/list'
import SuperLink from '~co/common/superLink'

import FilterIcon from './icon'
import Title from './title'

export default class FiltersItemView extends React.Component {
    render() {
        const {
            _id, query, count, active, focusable, getLink, ...etc
        } = this.props

        return (
            <Item 
                {...etc}
                className={s.item}
                data-id={_id}
                active={active}>
                <FilterIcon _id={_id} />

                <ItemTitle>
                    <Title _id={_id} />
                </ItemTitle>

                {count ? <ItemInfo>{humanNumber(count)}</ItemInfo> : null}

                {focusable && (
                    <SuperLink 
                        to={getLink({ _id: 0, search: query+' ' })}
                        tabIndex='0'/>
                )}
            </Item>
        )
    }
}