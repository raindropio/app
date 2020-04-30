import React from 'react'
import t from '~t'
import { humanNumber } from '~modules/strings'

import SuperLink from '~co/common/superLink'
import Icon from '~co/common/icon'
import CollectionIcon from './icon'

export default class CollectionsItemView extends React.PureComponent {
    renderStatus = ()=>{
		let status

        /*if (this.props.item.public)
            status = 'public'
        else*/ if (this.props.collaborators)
            status = 'collaborators'

		if (!status) return

		return (
			<div className='status'>
				<Icon name={'status_'+status} />
			</div>
		)
	}

    render() {
        const { _id, title, count, color, cover, level, selected, expanded, expandable, author, to } = this.props
        const { isDragging, isDropping } = this.props
        const { onClick, onExpandClick, onRenameClick, onContextMenu, onKeyUp } = this.props

        return (
            <article
                className={`collection ${selected && 'active'} ${expandable && (expanded ? 'expanded' : 'collapsed')} ${_id>0 && author && 'have-actions'} ${isDragging && 'is-dragging'} ${isDropping && 'is-drag-over'}`}
                style={{'--accentColor': color, '--level': level}}>
                <span className='expand' onMouseUp={onExpandClick}>
                    <Icon name='arrow_alt' />
                </span>

                <CollectionIcon
                    src={cover && cover[0]}
                    _id={_id}
                    selected={selected} />

                <div className='title'>
					<span>{title}</span>
				</div>

                <div className='space' />

                {this.renderStatus()}

                {count ? <div className='count'>{humanNumber(count)}</div> : null}
				{_id>0 && author ? <div className='actions'><span onClick={onRenameClick}>{t.s('editMin')}</span></div> : null}

                <SuperLink
					navPrefix='collection'
                    to={to}
                    tabIndex={selected ? '1' : '-1'}
					onClick={onClick}
					onDoubleClick={onExpandClick}
                    onContextMenu={onContextMenu}
					onKeyUp={onKeyUp}
					className='permalink' />
            </article>
        )
    }
}