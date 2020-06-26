import s from './view.module.styl'
import React from 'react'
import { humanNumber } from '~modules/strings'

import { Item, ItemExpand, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import SuperLink from '../../common/superLink'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import CollectionIcon from './icon'

export default class CollectionsItemView extends React.PureComponent {
    renderStatus = ()=>{
		let status

        if (this.props.public)
            status = 'public'
        else if (this.props.collaborators)
            status = 'user'

		if (!status) return

		return (
			<div>
				<Icon name={status} data-size='micro' />
			</div>
		)
	}

    render() {
        const { _id, title, count, color, cover, level, active, expanded, expandable, to, multiselect } = this.props
        const { innerRef, isDragging, isDropping } = this.props
        const { onClick, onExpandClick, onRenameClick, onContextMenu, onKeyUp } = this.props

        return (
            <Item
                ref={innerRef}
                active={active}
                expandable={expandable}
                expanded={expanded}
                isDragging={isDragging}
                isDropping={isDropping}
                color={color}
                level={level}>
                <ItemExpand onMouseUp={onExpandClick} />

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
                    {title}
                </ItemTitle>

                {this.renderStatus()}

                {count ? (
                    <ItemInfo>
                        {humanNumber(count)}
                    </ItemInfo>
                ) : null}

				{!multiselect ? (
                    <ItemActions>
                        <Button onClick={onContextMenu}>
                            <Icon name='more_horizontal' />
                        </Button>
                    </ItemActions>
                ) : null}

                <SuperLink
					navPrefix='menu-item'
                    to={to}
                    tabIndex={active ? '1' : '-1'}
                    focusable={!multiselect}
					onClick={onClick}
					onDoubleClick={onRenameClick}
                    onContextMenu={onContextMenu}
					onKeyUp={onKeyUp} />
            </Item>
        )
    }
}