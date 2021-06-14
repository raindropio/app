import _ from 'lodash-es'
import { normalizeBookmarks, blankSpace, queryIsEqual } from '../../helpers/bookmarks'
import { actualizeSpaceStatus } from './utils'
import { REHYDRATE } from 'redux-persist/src/constants'
import {
	SPACE_PER_PAGE,
	SPACE_LOAD_PRE, SPACE_LOAD_REQ, SPACE_LOAD_SUCCESS, SPACE_LOAD_ERROR,
	SPACE_REFRESH_REQ,
	SPACE_NEXTPAGE_REQ, SPACE_NEXTPAGE_SUCCESS, SPACE_NEXTPAGE_ERROR,
	SPACE_CHANGE_SORT,

	BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS
} from '../../constants/bookmarks'
import { COLLECTION_REMOVE_SUCCESS } from '../../constants/collections'

export default function(state, action) {switch (action.type) {
	case REHYDRATE:{
		const { spaces={}, elements={}, meta={} } = action.payload && action.payload.bookmarks||{}

		//restore all non-corrupted spaces
		_.forEach(spaces, (space, _id)=>{
			//is corrupted
			if (!space.status || 
				space.status.main != 'loaded' ||
				space.status.nextPage == 'loading') return

			//clean up
			const clean = space
				.set('ids', _.uniq(space.ids).slice(0, SPACE_PER_PAGE))
				.setIn(['query', 'page'], 0)
				.setIn(['status', 'nextPage'],
					space.status.nextPage == 'noMore' && (space.ids||[]).length < SPACE_PER_PAGE ?
						'noMore' :
						blankSpace.status.nextPage
				)

			state = state.setIn(['spaces', _id], clean)
		})

		//restore elements with meta data
		return state
			.set('elements', elements)
			.set('meta', meta)
	}

	//Load bookmarks
	case SPACE_LOAD_PRE:{
		const { spaceId, query } = action
		let space = state.spaces[spaceId]

		if (spaceId <= -100){
			action.ignore = true
			return state
		}

		//set loading status right away, because space is never loaded yet
		if (!space){
			let space = blankSpace
				.setIn(['status', 'main'], 'loading')

			return state.setIn(['spaces', spaceId], space)
		}

		//fix sort in query
		if (space && query && query.sort)
			if (!space.sorts[query.sort] || !space.sorts[query.sort].enabled)
				query.sort = '-created'

		//reset bookmarks list when query changed
		if (space && !queryIsEqual(space.query, query)){
			space = space
				.set('ids', [])
				.set('highlight', {})
				.set('lastAction', '')
				.set('version', '')

			return state.setIn(['spaces', spaceId], space)
		}

		return state
	}

	case SPACE_LOAD_REQ:{
		const { spaceId, query, lastAction, version } = action
		const oldSpace = state.spaces[spaceId]

		//ignore when nothing changed (including data, query)
		if (oldSpace && 
			oldSpace.lastAction == lastAction && 
			oldSpace.version == version){
			action.ignore = true
			return state
		}

		//reset space to initial state
		let space = (oldSpace || blankSpace)
			.set('lastAction', lastAction)
			.set('version', version)
			.setIn(['status', 'main'], 'loading')
			.setIn(['status', 'nextPage'], blankSpace.status.nextPage)

		//set correct query
		space = space.set('query', {
			...space.query,
			...query,
			page: 0
		})

		//send query in action
		action.query = space.query

		return state.setIn(['spaces', action.spaceId], space)
	}

	case SPACE_LOAD_SUCCESS:{
		const { spaceId, items=[], query } = action
		let space = state.spaces[spaceId]

		//results from other request, ignore
		if (!space || 
			(space.ids.length && !queryIsEqual(space.query, query)))
			return state

		const { ids, highlight, elements, meta } = normalizeBookmarks(items)

		//items changed
		if (!space.ids.length ||
			space.ids.length != ids.length ||
			!_.isEqual(space.ids.slice(0, ids.length), ids))
			space = space
				.set('ids', ids)
				.set('highlight', highlight)
				.setIn(['query', 'page'], 0)

		//statuses
		space = space.setIn(['status', 'main'],		ids.length ? 'loaded' : 'empty')
		space = space.setIn(['status', 'nextPage'],	(space.status.main == 'empty' || ids.length < SPACE_PER_PAGE) ? 'noMore' : 'idle')

		return state
			.setIn(['spaces', spaceId], space)
			.set('elements',			state.elements.merge(elements))
			.set('meta',				state.meta.merge(meta))
	}

	case SPACE_LOAD_ERROR:{
		const { spaceId, error, query } = action
		let space = state.spaces[spaceId] || blankSpace

		//results from other request, ignore
		if (!queryIsEqual(space.query, query))
			return state

		space = space
			.set('ids', [])
			.set('highlight', {})
			.setIn(
				['status', 'main'], 
				error && error.status >= 400 && error.status < 500 ? 'notFound' : 'error'
			)

		return state.setIn(['spaces', action.spaceId], space)
	}

	//Refresh
	case SPACE_REFRESH_REQ:{
		const { spaceId } = action
		let space = state.spaces[spaceId]

		//load from scratch
		if (!space)
			return state.setIn(['spaces', spaceId], blankSpace)

		//in progress
		if (space && 
			space.status && 
			space.status.main == 'loading'){
			action.ignore = true;
			return state;
		}

		space = space
			.setIn(['query', 'page'], 		0)

		//send query in action
		action.query = space.query

		//reload beginning from first page
		return state.setIn(['spaces', spaceId], space)
	}

	//Next page
	case SPACE_NEXTPAGE_REQ:{
		const { spaceId } = action
		let space = state.spaces[spaceId]
		
		//in progress
		if (!space ||
			!space.status ||
			!space.ids.length ||
			space.status.nextPage == 'loading' ||
			space.status.nextPage == 'noMore' ||
			space.status.main == 'loading' ||
			space.status.main == 'notFound' ||
			space.status.main == 'idle'){
				action.ignore = true;
				return state;
			}

		space = space
			.setIn(['status', 'nextPage'], 	'loading')
			.setIn(['query', 'page'], 		space.query.page+1)

		//send query in action
		action.query = space.query

		//set status and increment page
		return state.setIn(['spaces', spaceId], space)
	}

	case SPACE_NEXTPAGE_SUCCESS:{
		const { spaceId, items=[], query } = action
		let space = state.spaces[spaceId]

		//results from other request, ignore
		if (!space || 
			!queryIsEqual(space.query, query))
			return state

		const clean = normalizeBookmarks(items)

		space = space
			.setIn(['status', 'nextPage'], (items.length ? 'idle' : 'noMore'))
			.set('ids',						[...space.ids, ...clean.ids])
			.set('highlight',				space.highlight.merge(clean.highlight))

		return state
			.setIn(['spaces', spaceId],		space)
			.set('elements',				state.elements.merge(clean.elements))
			.set('meta',					state.meta.merge(clean.meta))
	}

	case SPACE_NEXTPAGE_ERROR:{
		const { spaceId, query } = action
		const space = state.spaces[spaceId]

		//results from other request, ignore
		if (!space || 
			!queryIsEqual(space.query, query))
			return state

		const page = space.query.page-1

		return state
			.setIn(['spaces', spaceId, 'status', 'nextPage'], 	'error')
			.setIn(['spaces', spaceId, 'query', 'page'], 		(page>=0?page:0))
	}

	//Change sort
	case SPACE_CHANGE_SORT:{
		const { spaceId, sort } = action
		let space = state.spaces[spaceId]

		if (!space)
			return state

		space = space
			.setIn(['query', 'sort'], sort)
			.setIn(['query', 'page'], 0)

		if (sort != space.query.sort)
			space = space
				.set('ids', [])
				.set('highlight', {})

		//send query in action
		action.query = space.query

		return state.setIn(['spaces', spaceId], space)
	}

	//Update Space Status when Bookmark Changed
	case BOOKMARK_CREATE_SUCCESS:
	case BOOKMARK_REMOVE_SUCCESS:{
		if (action.spaceId)
			(Array.isArray(action.spaceId) ? action.spaceId : [action.spaceId]).forEach(spaceId=>{
				state = actualizeSpaceStatus(state, spaceId)
			})
		
		state = actualizeSpaceStatus(state, '0')
		state = actualizeSpaceStatus(state, '-99')

		return state
	}

	case BOOKMARK_UPDATE_SUCCESS:{
		const movedFromSpaceId = action.movedFromSpaceId ? (Array.isArray(action.movedFromSpaceId) ? action.movedFromSpaceId : [action.movedFromSpaceId]) : []

		if (movedFromSpaceId.length){
			movedFromSpaceId.forEach(movedFromSpaceId=>{
				state = actualizeSpaceStatus(state, movedFromSpaceId)
			});

			(Array.isArray(action.spaceId) ? action.spaceId : [action.spaceId]).forEach(spaceId=>{
				state = actualizeSpaceStatus(state, spaceId)
			})
			
			state = actualizeSpaceStatus(state, '0')
		}

		return state
	}

	case COLLECTION_REMOVE_SUCCESS:{
		let spaces = Array.isArray(action._id) ? action._id : [action._id]
		spaces.push(...spaces.map(space=>space+'s'))

		let ids = []
		
		for(const id of spaces){
			const spaceId = String(id)

			const space = state.getIn(['spaces', spaceId])
			if (!space) continue

			//collect all bookmark ids
			ids.push(...space.ids)

			//mark space as 'notFound'
			state = state
				.setIn(['spaces', spaceId], blankSpace.setIn(['status', 'main'], spaceId==-99 ? 'empty' : 'notFound'))
		}
		
		//remove elements
		state = state
			.set('elements', state.elements.without(ids))
			.set('meta', state.meta.without(ids))

		//remove from *all bookmarks* ids
		for(const spaceId of [0, '0s']){
			let space = state.spaces[spaceId]
			if (!space) continue
			
			space = space
				.set('ids', _.without(space.ids, ...ids))
				.set('highlight', space.highlight.without(ids))

			state = state.setIn(['spaces', spaceId], space)
		}
		
		return state
	}
}}