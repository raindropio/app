import React from 'react'
import network from '~network'
import config from '~config'
import { formatDate } from '../section'

import collectionsStore from '../../../stores/collections.js'
import userStore from '../../../stores/user'

import Icon from '~icon'
import FavIcon from '../../common/favIcon'
import CollectionIcon from '../../collections/icon'

export default function ItemFooter({domain = '', siteName='', type='link', created=null, lastUpdate=null, cid=null, className="", creatorRef, pleaseParse, cache, children}){
	var typeStr = null;
	if (type!="link" || pleaseParse)
		typeStr = (
			<div className="info-important">
				<span className="info-img">
					<Icon name={pleaseParse ? 'progress' : type} size="micro" />
				</span>
			</div>)

	var cacheStr = null;
	if (cache && cache.status != 'ready' && cache.status != 'retry')
		cacheStr = (
			<div className="info-important">
				<span className="info-img">
					<Icon name='cache_failed' size="micro" />
				</span>
			</div>)

	var path = null, site = null;
	if (cid){
		var collection = collectionsStore.getCollection(cid);
		if (collection)
			path = (
				<a href={"#/collection/"+collection._id} className="info info-path">
					<span className="info-img">
						<CollectionIcon _id={collection._id} src={(collection.cover||[])[0]} size="16" />
					</span>
					<span className="info-path-title">
						{collection.title}
					</span>
				</a>);
	}

	var cleanDomain = siteName||network.cleanDomain(domain);
	if (cleanDomain != config.home)
		site = (
			<div className="info-domain">
				{/*<FavIcon className="info-img" domain={domain} />*/}
				{cleanDomain}&nbsp; ·&nbsp; 
			</div>
		)

	let creator
	if (creatorRef && creatorRef._id)
		if (creatorRef._id != userStore.getId())
			creator = (
				<div className="info info-path info-creator">
					<span className="info-img">
						<Icon name="status_collaborators" />
					</span>
					<span className="info-path-title">
						{creatorRef.fullName}
					</span>
				</div>
			)

	return (
		<div className="info-wrap">
			{creator}

			{path}

			<div className={"info "+className}>
				{children}
				{typeStr}
				{cacheStr}
				{site}{formatDate(created || lastUpdate, false)}
			</div>
		</div>
    );
}