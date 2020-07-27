import s from './view.module.styl'
import React from 'react'
import t from '~t'
import { humanNumber } from '~modules/strings'

import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

import FilterIcon from './icon'
import Title from './title'

export default class FiltersItemView extends React.Component {
    render() {
        const {
            _id, count, active, canAppend, onAppendClick, focusable, ...etc
        } = this.props

        const showActions = canAppend && onAppendClick

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

                {showActions ? (
                    <ItemActions>
                        <Button 
                            title={t.s('add')+' '+t.s('filters')}
                            onClick={onAppendClick}>
                            <Icon name='search_add' />
                        </Button>
                    </ItemActions>
                ) : null}

                {focusable && (
                    <SuperLink tabIndex='0'/>
                )}
            </Item>
        )
    }
}