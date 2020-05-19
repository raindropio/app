import { call, put, takeEvery, select, all } from 'redux-saga/effects'
import { batchActions } from 'redux-batched-actions'
import _ from 'lodash-es'
import Api from '../../modules/api'
import ApiError from '../../modules/error'

import { getSpaceQuery } from '../../helpers/bookmarks'

import {
	SELECT_MODE_IMPORTANT_SELECTED,
	SELECT_MODE_REMOVE_SELECTED,
	SELECT_MODE_SCREENSHOT_SELECTED,
	SELECT_MODE_APPENDTAGS_SELECTED,
	SELECT_MODE_MOVE_SELECTED,

	SELECT_MODE_DISABLE,

	BOOKMARK_UPDATE_SUCCESS,
	BOOKMARK_REMOVE_SUCCESS,
} from '../../constants/bookmarks'

export default function* () {
	//Make Important Selected
	yield takeEvery(
		SELECT_MODE_IMPORTANT_SELECTED, 
		updateBookmarks({
			set: ()=>({
				important: true
			})
		})
	)

	//Make screenshots
	yield takeEvery(
		SELECT_MODE_SCREENSHOT_SELECTED,
		updateBookmarks({
			set: ()=>({
				media: [{link: '<screenshot>'}]
			}),
			mutate: (action, item)=>({
				...item,
				media: [{link: item.link, screenshot: true}, ...item.media||[]],
				cover: item.link,
				coverId: 0
			})
		})
	)

	//Append tags
	yield takeEvery(
		SELECT_MODE_APPENDTAGS_SELECTED,
		updateBookmarks({
			validate: ({ tags=[] })=>{
				if (!tags.length)
					throw new ApiError('tags', 'no tags specified')
			},
			set: ({ tags })=>({
				tags
			}),
			mutate: ({ tags }, item)=>({
				...item,
				tags: [...item.tags||[], ...tags]
			})
		})
	)

	//Move selected
	yield takeEvery(
		SELECT_MODE_MOVE_SELECTED,
		updateBookmarks({
			set: ({ to })=>({
				collectionId: to
			})
		})
	)

	//Remove selected
	yield takeEvery(SELECT_MODE_REMOVE_SELECTED, removeBookmarks)
}

const updateBookmarks = ({validate, set, mutate}) => (
	function* ({onSuccess, onFail, ...action}) {
		try{
			//Validate
			typeof validate == 'function' && validate(action)

			//Prepare
			const state = yield select()
			const fields = set(action)

			//Send update request
			const changed = yield batchApiRequestHelper('put', fields)
			
			//Update local state
			if (changed.length)
				yield put(batchActions([
					{
						type: SELECT_MODE_DISABLE
					},
					..._.map(changed, (_id)=>{
						let item = {...state.bookmarks.elements[_id], ...state.bookmarks.meta[_id]}
	
						if (mutate)
							item = mutate(action, item)
						else
							item = {...item, ...fields}
	
						return {
							type: BOOKMARK_UPDATE_SUCCESS,
							_id,
							item
						}
					})
				]))

			typeof onSuccess == 'function' && onSuccess()
		}catch(e){
			console.log(e)
			typeof onFail == 'function' && onFail()
		}
	}
)

function* removeBookmarks({onSuccess, onFail}) {
	try{
		const changed = yield batchApiRequestHelper('del')

		if (changed.length)
			yield put(batchActions([
				//turn off select mode
				{
					type: SELECT_MODE_DISABLE
				},
				..._.map(changed, (_id)=>({
					type: BOOKMARK_REMOVE_SUCCESS,
					_id
				}))
			]))

		if (typeof onSuccess == 'function')
			onSuccess()
	}catch(e){
		console.log(e)

		if (typeof onFail == 'function')
			onFail()
	}
}

//Returns array of affected id's
function* batchApiRequestHelper(method, body={}) {
	const state = yield select()
	const { bookmarks } = state
	const { spaceId, ids, all } = bookmarks.selectMode

	//fail when nothing selected
	if (!all && !ids.length)
		throw new ApiError('ids', 'nothing selected')

	//operations should be splited by collections
	let groupByCollection = []

	//all bookmarks
	if (parseInt(spaceId)==0 || all)
		groupByCollection = [
			[parseInt(spaceId), ids]
		]
	//per collection
	else
		groupByCollection = _.toPairs(
			_.groupBy(
				_.pick(bookmarks.elements, ids),
				'collectionId'
			)
		).map(([cid, items])=>
			[ cid, items.map(({_id})=>_id) ]
		)

	let changed = []

	//apply for each collection
	for(const [collectionId, ids] of groupByCollection){
		const query = getSpaceQuery(bookmarks, collectionId).string

		//send request
		const { result=false, modified=0, error, errorMessage } = yield call(
			Api[method],
			`raindrops/${query}${query.includes('?')?'&':'?'}dangerAll=true`,
			{
				...body,
				...(all ? {} : { ids })
			}
		)

		if (!result)
			throw new ApiError(error, errorMessage||'cant bulk change')

		if (modified)
			changed.push(...(all ? state.bookmarks.spaces[spaceId].ids : ids))
	}

	return changed
}