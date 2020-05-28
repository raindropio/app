import _ from 'lodash-es'
import {
	iterateSpaceId,
	blankSpace
} from '../../helpers/bookmarks'

export const isQueryChanged = (state, spaceId, nextToCheck)=>{
	const space = state.getIn(['spaces', spaceId])
	if (!space)
		return true

	const prevQuery = space.query||blankSpace.query
	var nextQuery = prevQuery
	_.forEach(nextToCheck, (val,key)=>{
		if (!_.isEqual(prevQuery[key], val))
			nextQuery = nextQuery.set(key,val)
	})

	return !_.isEqual(prevQuery, nextQuery)
}

export const replaceBookmarksSpace = (state, clean, spaceId)=>{
	const space = state.getIn(['spaces', spaceId])||{}
	const existing = (space['ids']||[])
	
	//reset only when items changed
	if (existing.length != clean['ids'].length ||
		!_.isEqual(existing.slice(0, clean['ids'].length), clean['ids']))
		state = state
			.setIn(['spaces', spaceId, 'ids'], clean['ids'])
			.setIn(['spaces', spaceId, 'query', 'page'], 0)

	state = state.set('elements', state.elements.merge(clean.elements), {deep: true})
	state = state.set('meta', state.meta.merge(clean.meta))

	return state
}

export const actualizeSpaceStatus = (state, spaceId)=>{
	iterateSpaceId(spaceId, (cleanSpaceId)=>{
		const space = state.getIn(['spaces', cleanSpaceId])
		var newMainStatus = '',
			newNextPageStatus = ''

		if (space && space.status){
			if ((space.status.main=='loaded')&&(space.ids.length==0)){
				newMainStatus = 'empty'
				newNextPageStatus = 'noMore'
			}
			else if ((space.status.main=='empty')&&(space.ids.length)){
				newMainStatus = 'loaded'
				newNextPageStatus = 'noMore'
			}
		}

		if (newMainStatus)
			state = state.setIn(['spaces', cleanSpaceId, 'status', 'main'], 		newMainStatus)

		if (newNextPageStatus)
			state = state.setIn(['spaces', cleanSpaceId, 'status', 'nextPage'], 	newNextPageStatus)
	})

	return state
}

export const insertIdToSpace = (state, spaceId, _id)=>{
	iterateSpaceId(spaceId, (cleanSpaceId)=>{
		const space = state.getIn(['spaces', cleanSpaceId])
		if (space)
			if (space.status.main=='loaded' || space.status.main=='empty'){
				state = state
					.setIn(['spaces', cleanSpaceId, 'ids'], _.uniq([_id].concat(space.ids)))
			}
	})

	return state
}

export const removeIdFromSpace = (state, spaceId, _id)=>{
	iterateSpaceId(spaceId, (cleanSpaceId)=>{
		const ids = state.getIn(['spaces', cleanSpaceId, 'ids'])||[]
		if (ids.length)
			state = state
				.setIn(['spaces', cleanSpaceId, 'ids'], ids.filter((id)=>id!=_id))
	})

	return state
}