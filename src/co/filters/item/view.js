import s from './view.module.styl'
import React from 'react'
import t from '~t'
import { humanNumber } from '~modules/strings'

import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

export default class FiltersItemView extends React.Component {
    render() {
        const {
            _id, count, active, canAppend, onAppendClick, focusable, ...etc
        } = this.props

        let icon, title

        switch (_id) {
            case 'important':
                icon = 'important'
                title = t.s('favoriteSites')
                break

            case 'notag':
                icon = 'tag'
                title = t.s('noTags')
                break

            case 'tag':
                icon = ''
                title = '#'
                break
        
            default:
                icon = _id
                title = t.s(_id)
                break
        }

        const showActions = canAppend && onAppendClick

        return (
            <Item 
                {...etc}
                className={s.item}
                data-id={_id}
                active={active}>
                {icon && (
                    <ItemIcon className={s.icon}>
                        <Icon name={icon} size='micro' />
                    </ItemIcon>
                )}

                <ItemTitle>{title}</ItemTitle>

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
                    <SuperLink tabIndex='1'/>
                )}
            </Item>
        )
    }
}