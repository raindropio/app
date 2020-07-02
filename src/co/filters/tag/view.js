import s from './view.module.styl'
import React from 'react'
import { humanNumber } from '~modules/strings'

import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

export default class FiltersTagView extends React.Component {
    render() {
        const { _id, count, active, canAppend } = this.props
        const { onClick, onAppendClick, onRenameClick, onContextMenu, onKeyUp } = this.props

        return (
            <Item
                className={s.item}
                active={active}>
                <ItemIcon>
                    <Icon name='tag' />
                </ItemIcon>

                <ItemTitle>{_id}</ItemTitle>

                {count ? <ItemInfo>{humanNumber(count)}</ItemInfo> : null}
                <ItemActions>
                    {canAppend && onAppendClick && (
                        <Button onClick={onAppendClick}>
                            <Icon name='search_add' />
                        </Button>
                    )}
                    <Button onClick={onContextMenu}>
                        <Icon name='more_horizontal' />
                    </Button>
                </ItemActions>

                <SuperLink
                    tabIndex='1'
                    active={active}
                    
                    onClick={onClick}
                    onDoubleClick={onRenameClick}
                    onContextMenu={onContextMenu}
                    onKeyUp={onKeyUp} />
            </Item>
        )
    }
}