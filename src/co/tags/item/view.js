import s from './view.module.styl'
import React from 'react'
import t from '~t'
import { humanNumber } from '~modules/strings'

import { Item, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'
import TagIcon from './icon'

export default class TagsItemView extends React.Component {
    render() {
        const {
            _id, count, active, canAppend, focusable,
            onAppendClick, onRenameClick,
            oneRename, onRenameCancel, onContextMenuClose, onRemoveClick, onRename, //to ignore
            ...etc
        } = this.props

        return (
            <Item
                onDoubleClick={onRenameClick}
                {...etc}
                className={s.item}
                active={active}>
                <TagIcon />

                <ItemTitle>{_id}</ItemTitle>

                {count ? <ItemInfo>{humanNumber(count)}</ItemInfo> : null}
                <ItemActions>
                    {canAppend && onAppendClick && (
                        <Button 
                            title={t.s('add')+' '+t.s('filters')}
                            onClick={onAppendClick}>
                            <Icon name='search_add' />
                        </Button>
                    )}
                    {etc.onContextMenu && (
                        <Button 
                            title={t.s('more')}
                            onClick={etc.onContextMenu}>
                            <Icon name='more_horizontal' />
                        </Button>
                    )}
                </ItemActions>

                {focusable && (
                    <SuperLink tabIndex='0'/>
                )}
            </Item>
        )
    }
}