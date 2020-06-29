import React from 'react'
import t from '~t'
import { humanNumber } from '~modules/strings'

import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

export default class FiltersType extends React.Component {
    render() {
        const { _id, count, active, canAppend } = this.props
        const { onClick, onContextMenu, onAppendClick } = this.props

        const showActions = canAppend && onAppendClick

        return (
            <Item 
                active={active}>
                <ItemIcon>
                    <Icon name={_id} />
                </ItemIcon>

                <ItemTitle>{t.s(_id)}</ItemTitle>

                {count ? <ItemInfo>{humanNumber(count)}</ItemInfo> : null}

                {showActions ? (
                    <ItemActions>
                        <Button onClick={onAppendClick}>
                            <Icon name='search_add' />
                        </Button>
                    </ItemActions>
                ) : null}

                <SuperLink
                    navPrefix='menu-item'
                    tabIndex={active ? '1' : '-1'}
                    onClick={onClick}
                    onContextMenu={onContextMenu} />
            </Item>
        )
    }
}