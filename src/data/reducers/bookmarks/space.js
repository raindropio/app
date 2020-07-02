import _ from 'lodash-es'
import {
	normalizeBookmarks,
	blankSpace,
	shouldLoadSpace,
	shouldLoadMoreSpace
} from '../../helpers/bookmarks'
import {
	isQueryChanged,
	actualizeSpaceStatus,
	replaceBookmarksSpace
} from './utils'
import {REHYDRATE} from 'redux-persist/src/constants'
import {
	SPACE_PER_PAGE,
	SPACE_LOAD_REQ, SPACE_LOAD_SUCCESS, SPACE_LOAD_ERROR,
	SPACE_RELOAD_REQ,
	SPACE_REFRESH_REQ,
	SPACE_ACTUALIZE_REQ,
	SPACE_NEXTPAGE_REQ, SPACE_NEXTPAGE_SUCCESS, SPACE_NEXTPAGE_ERROR,
	SPACE_CHANGE_SORT,

	BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS
} from '../../constants/bookmarks'
import { COLLECTION_REMOVE_SUCCESS } from '../../constants/collections'

export default function(state, action) {switch (action.type) {
	case REHYDRATE:{
		const { spaces={}, elements={}, meta={} } = action.payload && action.payload.bookmarks||{}

		_.forEach(spaces, (space, _id)=>{
			if (!space.status ||
				space.status.main != 'loaded' ||
				space.status.nextPage == 'error' ||
				space.status.nextPage == 'loading')
				return

			state = state
				.setIn(['spaces', _id], space)
				.setIn(['spaces', _id, 'ids'], _.uniq(space.ids).slice(0, SPACE_PER_PAGE))
				.setIn(['spaces', _id, 'query', 'page'], 0)
		})

		return state
			.set('elements', elements)
			.set('meta', meta)
	}

	//Load bookmarks
	case SPACE_LOAD_REQ:{
		if (!shouldLoadSpace(state, action.spaceId)){
			action.ignore = true;
			return state;
		}

		const query = action.query||{};

		if (isQueryChanged(state, action.spaceId, query)){
			state = replaceBookmarksSpace(state, normalizeBookmarks([]), action.spaceId)

			return state
				.setIn(['spaces', action.spaceId, 'status', 'main'], 		'loading')
				.setIn(['spaces', action.spaceId, 'status', 'nextPage'], 	'noMore')
				.setIn(['spaces', action.spaceId, 'query', 'search'], 		query.search||blankSpace.query.search)
				.setIn(['spaces', action.spaceId, 'query', 'sort'], 		query.sort||blankSpace.query.sort)
		}
		
		return state
	}

	case SPACE_LOAD_SUCCESS:{
		const statusMain = (action.items.length ? 'loaded' : 'empty')
		const statusNextPage = ((statusMain == 'empty' || action.items.length < SPACE_PER_PAGE) ? 'noMore' : 'idle')

		state = replaceBookmarksSpace(state, normalizeBookmarks(action.items), action.spaceId)

		return state
			.setIn(['spaces', action.spaceId, 'status', 'main'], 		statusMain)
			.setIn(['spaces', action.spaceId, 'status', 'nextPage'], 	statusNextPage)
	}

	case SPACE_LOAD_ERROR:{
		state = replaceBookmarksSpace(state, normalizeBookmarks([]), action.spaceId)

		return state
			.setIn(['spaces', action.spaceId, 'status', 'main'], 		action.error && action.error.message && action.error.message.includes('not found') ? 'notFound' : 'error')
	}

	//Reload
	case SPACE_RELOAD_REQ:{
		if (!shouldLoadSpace(state, action.spaceId)){
			action.ignore = true;
			return state;
		}

		return state
			.setIn(['spaces', action.spaceId, 'status', 'main'], 		'loading')
			.setIn(['spaces', action.spaceId, 'status', 'nextPage'], 	'noMore')
			.setIn(['spaces', action.spaceId, 'query', 'page'], 		0)
	}

	//Refresh
	case SPACE_REFRESH_REQ:{
		if (
			!shouldLoadSpace(state, action.spaceId) ||
			!state.getIn(['spaces', action.spaceId])
		){
			action.ignore = true;
			return state;
		}

		return state
			.setIn(['spaces', action.spaceId, 'status', 'main'], 		'loading')
			.setIn(['spaces', action.spaceId, 'status', 'nextPage'], 	'noMore')
			.setIn(['spaces', action.spaceId, 'query', 'page'], 		0)
	}

	//Actualize
	case SPACE_ACTUALIZE_REQ:{
		if (!shouldLoadSpace(state, action.spaceId)){
			action.ignore = true;
			return state;
		}

		if (state.getIn(['spaces', action.spaceId, 'query', 'page'])!==0)
			return state;

		return state
			.setIn(['spaces', action.spaceId, 'status', 'main'], 		'loading')
			.setIn(['spaces', action.spaceId, 'status', 'nextPage'], 	'noMore')
			.setIn(['spaces', action.spaceId, 'query', 'page'], 		0)
	}

	//Next page
	case SPACE_NEXTPAGE_REQ:{
		if (!shouldLoadMoreSpace(state, action.spaceId)){
			action.ignore = true;
			return state;
		}

		const space = state.spaces[action.spaceId]
		return state
			.setIn(['spaces', action.spaceId, 'status', 'nextPage'], 	'loading')
			.setIn(['spaces', action.spaceId, 'query', 'page'], 		space.query.page+1)
	}

	case SPACE_NEXTPAGE_SUCCESS:{
		const space = state.spaces[action.spaceId]
		const clean = normalizeBookmarks(action.items)

		return state
			.setIn(['spaces', action.spaceId, 'status', 'nextPage'], 	(action.items.length ? 'idle' : 'noMore'))
			.setIn(['spaces', action.spaceId, 'ids'], 					[...space.ids||[], ...clean.ids])
			.set('elements', 										state.elements.merge(clean.elements))
			.set('meta', 											state.meta.merge(clean.meta))
	}

	case SPACE_NEXTPAGE_ERROR:{
		const space = state.spaces[action.spaceId]
		const page = space.query.page-1
		return state
			.setIn(['spaces', action.spaceId, 'status', 'nextPage'], 	'error')
			.setIn(['spaces', action.spaceId, 'query', 'page'], 		(page>=0?page:0))
	}

	//Change sort
	case SPACE_CHANGE_SORT:{
		if (action.sort != state.getIn(['spaces', action.spaceId, 'query', 'sort']))
			state = state
				.setIn(['spaces', action.spaceId, 'ids'], 				blankSpace.ids)

		return state
			.setIn(['spaces', action.spaceId, 'query', 'sort'], 		action.sort)
			.setIn(['spaces', action.spaceId, 'query', 'page'], 		0)
	}

	//Update Space Status when Bookmark Changed
	case BOOKMARK_CREATE_SUCCESS:{
		state = actualizeSpaceStatus(state, action.spaceId)
		state = actualizeSpaceStatus(state, '0')
		
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

	case BOOKMARK_REMOVE_SUCCESS:{
		if (action.spaceId)
			(Array.isArray(action.spaceId) ? action.spaceId : [action.spaceId]).forEach(spaceId=>{
				state = actualizeSpaceStatus(state, spaceId)
			})
		
		state = actualizeSpaceStatus(state, '-99')

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
		for(const spaceId of [0, '0s'])
			if (state.spaces[spaceId])
				state = state
					.setIn(['spaces', spaceId, 'ids'], _.without(state.getIn(['spaces', spaceId, 'ids']), ...ids) )
		
		return state
	}
}}