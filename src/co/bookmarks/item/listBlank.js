import React from 'react'

import keyvalStore from '../../../stores/keyval'
import Cover from '../../common/cover'
import Tags from './tags'
import SuperLink from '../../common/superLink'
import ItemFooter from './footer'
import LabelHighlight from './label'

export default (props) => {
	return (
		<article className={(props.baseClassName||"")+(props.className||"")} id={"element"+props.item._id} title={props.item.link}>
			{props.addToFavorite ? props.addToFavorite() : null}
			<Cover src={props.item.cover} link={props.item.link} domain={props.item.domain} width={100} />
			{props.checkIcon}

			<div className="about">
				<LabelHighlight className='title' field='title' item={props.item} />
				<div>
				<LabelHighlight className='description' field='excerpt' Element='p' item={props.item} />
				<LabelHighlight className='description from-body' field='body' Element='p' item={props.item} />
				</div>
				
				<Tags tags={props.item.tags} appendQuery={props.appendQuery} />

				<ItemFooter 
					className="info-domain"
					cid={props.item.collection && props.spaceId != props.item.collection.$id ? props.item.collection.$id : null}
					domain={props.item.domain}
					siteName={props.item.site}
					created={props.item.created}
					lastUpdate={props.item.lastUpdate}
					type={props.item.type}
					creatorRef={props.item.creatorRef}
					pleaseParse={props.item.pleaseParse}
					cache={props.item.cache}
					 />
			</div>

			{props.children}

			{props.actions}

			<SuperLink
				navPrefix="element"
				tabIndex={props.isActive||(!props.activeId && props.isFirst) ? "200" : undefined}
				href={props.item.link}
				onClick={props.openReader}
				onDoubleClick={props.onDoubleClick}
				onKey={props.onKey}
				onContextMenu={props.onContextMenu}
				target={keyvalStore.onGet("open-links-here") ? "" : "_blank"}
				className="permalink" />
		</article>
	)
}