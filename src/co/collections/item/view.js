import s from './view.module.styl'
import React from 'react'
import t from '~t'
import { compact } from '~modules/format/number'

import { Item, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import SuperLink from '../../common/superLink'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import CollectionIcon from './icon'
import CollectionTitle from './title'

export default class CollectionsItemView extends React.PureComponent {
    renderStatus = ()=>{
		let status

        if (this.props.public)
            status = 'public'
        else if (this.props.collaborators)
            status = 'user'

		if (!status) return

		return (
			<ItemInfo>
				<Icon name={status} size='micro' />
			</ItemInfo>
		)
	}

    render() {
        const { _id, title, count, color, cover, level, active, expanded, expandable, to, multiselect } = this.props
        const { innerRef, isDragging, isDropping, dropHandlers={} } = this.props
        const { onClick, onExpandClick, onRenameClick, onContextMenu, onKeyUp } = this.props

        return (
            <Item
                ref={innerRef}
                className={`${s.item} ${expandable && (expanded ? s.expanded : s.collapsed)} ${isDragging && s.isDragging} ${isDropping && s.isDropping}`}
                focusable={!multiselect}
                style={{'--level': level}}
                active={active}
                color={color}
                {...dropHandlers}>
                <div 
                    className={s.expand}
                    title={expanded ? 'Collapse' : 'Expand'}
                    onMouseUp={onExpandClick}>
                    <Icon name='arrow_alt' />
                </div>

                {_id > 0 && multiselect ? (
                    <input 
                        className={s.checkbox}
                        type='checkbox' 
                        checked={active} 
                        onChange={onClick} />
                ) : null}

                <CollectionIcon
                    cover={cover}
                    _id={_id}
                    active={active} />

                <ItemTitle>
                    <CollectionTitle {...this.props} />
                </ItemTitle>

                {this.renderStatus()}

                {count ? (
                    <ItemInfo className={s.count}>
                        {compact(count)}
                    </ItemInfo>
                ) : null}

				{!multiselect ? (
                    <ItemActions>
                        <Button 
                            title={t.s('more')}
                            onClick={onContextMenu}>
                            <Icon name='more_horizontal' />
                        </Button>
                    </ItemActions>
                ) : null}

                <SuperLink
                    to={to}

                    active={active}
                    tabIndex='0'

					onClick={onClick}
					onDoubleClick={onRenameClick}
                    onContextMenu={onContextMenu}
					onKeyUp={onKeyUp}>
                    {title}
                </SuperLink>
            </Item>
        )
    }
}