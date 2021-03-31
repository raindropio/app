import s from './view.module.styl'
import React from 'react'
import t from '~t'
import { compact } from '~modules/format/number'

import { Item, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'
import TagIcon from './icon'

export default class TagsItemView extends React.Component {
    render() {
        const {
            _id, count, isNew, active, query, focusable, getLink, showIcon=true,
            onRenameClick,
            oneRename, onRenameCancel, onContextMenuClose, onRemoveClick, onRename, oneRemove, //to ignore
            ...etc
        } = this.props

        return (
            <Item
                onDoubleClick={onRenameClick}
                {...etc}
                className={s.item}
                active={active}>
                {showIcon && <TagIcon />}

                <ItemTitle>{_id}</ItemTitle>

                {count ? <ItemInfo>{compact(count)}</ItemInfo> : null}
                {isNew ? <ItemInfo>{t.s('newString')} {t.s('tag')}</ItemInfo> : null}
                <ItemActions>
                    {etc.onContextMenu && (
                        <Button 
                            title={t.s('more')}
                            onClick={etc.onContextMenu}>
                            <Icon name='more_horizontal' />
                        </Button>
                    )}
                </ItemActions>

                {focusable && (
                    <SuperLink 
                        to={getLink({ _id: 0, search: query+' ' })}
                        tabIndex='0'/>
                )}
            </Item>
        )
    }
}