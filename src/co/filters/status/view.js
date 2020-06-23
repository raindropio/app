import React from 'react'
import t from '~t'
import { humanNumber } from '~modules/strings'

import { Item, ItemExpand, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

export default class FiltersStatusView extends React.Component {
    render() {
        const { _id, count, active, canAppend } = this.props
        const { onClick, onContextMenu, onAppendClick } = this.props
        let icon, title

        switch (_id) {
            case 'important':
                icon = 'like'
                title = t.s('favoriteSites')
                break

            case 'notag':
                icon = 'tag'
                title = t.s('noTags')
                break
        
            default:
                icon = _id
                title = t.s(_id)
                break
        }

        const showActions = canAppend && onAppendClick

        return (
            <Item active={active}>
                <ItemExpand />

                <ItemIcon>
                    <Icon name={icon} />
                </ItemIcon>

                <ItemTitle>{title}</ItemTitle>

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