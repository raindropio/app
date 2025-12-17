import { call, put, takeEvery, select, all } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../../modules/api'
import ApiError from '../../modules/error'

import { getUrl } from '../../helpers/bookmarks'

import {
	SELECT_MODE_IMPORTANT_SELECTED,
	SELECT_MODE_REMOVE_SELECTED,
	SELECT_MODE_SCREENSHOT_SELECTED,
	SELECT_MODE_APPENDTAGS_SELECTED,
	SELECT_MODE_MOVE_SELECTED,
	SELECT_MODE_REMOVETAGS_SELECTED,
	SELECT_MODE_REPARSE_SELECTED,
	SELECT_MODE_FAIL_SELECTED,

	SELECT_MODE_DISABLE,

	BOOKMARK_UPDATE_SUCCESS,
	BOOKMARK_REMOVE_SUCCESS,
} from '../../constants/bookmarks'

export default function* () {
	//Make Important Selected
	yield takeEvery(
		SELECT_MODE_IMPORTANT_SELECTED, 
		updateBookmarks({
			set: ({ important })=>({
				important
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
				cover: item.link
			})
		})
	)

	//Append tags
	yield takeEvery(
		SELECT_MODE_APPENDTAGS_SELECTED,
		updateBookmarks({
			validate: ({ tags=[] })=>{
				if (!tags.length)
					throw new ApiError({ status: 400, error: 'tags', errorMessage: 'no tags specified'})
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

	//Remove tags
	yield takeEvery(
		SELECT_MODE_REMOVETAGS_SELECTED,
		updateBookmarks({
			set: ()=>({
				tags: []
			}),
			mutate: (_, item)=>({
				...item,
				tags: []
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

	//Reparse selected
	yield takeEvery(
		SELECT_MODE_REPARSE_SELECTED, 
		updateBookmarks({
			set: ()=>({
				excerpt: '',
				cover: '',
				media: [],
				pleaseParse: {
					date: new Date()
				}
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
				yield all([
					//turn off select mode
					put({
						type: SELECT_MODE_DISABLE
					}),
					//update local state
					put({
						type: BOOKMARK_UPDATE_SUCCESS,
						item: changed.map(_id => {
							let item = {
								...state.bookmarks.elements[_id],
								...state.bookmarks.meta[_id]
							}

							return mutate ? 
								mutate(action, item) :
								{...item, ...fields}
						})
					})
				])

			typeof onSuccess == 'function' && onSuccess()
		}catch(error){
			typeof onFail == 'function' && onFail(error)

			yield put({
				type: SELECT_MODE_FAIL_SELECTED,
				error
			})
		}
	}
)

function* removeBookmarks({onSuccess, onFail}) {
	try{
		const removed = yield batchApiRequestHelper('del')

		if (removed.length)
			yield all([
				//turn off select mode
				put({
					type: SELECT_MODE_DISABLE
				}),
				//remove from local state
				put({
					type: BOOKMARK_REMOVE_SUCCESS,
					_id: removed
				})
			])

		if (typeof onSuccess == 'function')
			onSuccess()
	}catch(error){
		typeof onFail == 'function' && onFail(error)

		yield put({
			type: SELECT_MODE_FAIL_SELECTED,
			error
		})
	}
}

//Returns array of affected id's
function* batchApiRequestHelper(method, body={}) {
	const state = yield select()
	const { bookmarks } = state
	const { selectMode } = bookmarks

	//fail when nothing selected
	if (!selectMode.all && !selectMode.ids.length)
		throw new ApiError({ status: 400, error: 'ids', errorMessage: 'nothing selected'})

	//operations should be splited by collections
	let groupByCollection = []

	//all bookmarks
	if (parseInt(selectMode.spaceId)==0 || selectMode.all)
		groupByCollection = [
			[selectMode.spaceId, selectMode.ids]
		]
	//per collection
	else
		groupByCollection = _.toPairs(
			_.groupBy(
				_.pick(bookmarks.elements, selectMode.ids),
				'collectionId'
			)
		).map(([cid, items])=>
			[ cid, items.map(({_id})=>_id) ]
		)

	let changed = []

	//apply for each collection
	for(const [collectionId, ids] of groupByCollection){
		const url = getUrl(collectionId, bookmarks.getIn(['spaces', collectionId, 'query']))

		//send request
		yield call(
			Api[method],
			`raindrops/${url}&dangerAll=true`,
			{
				...body,
				...(selectMode.all ? {} : { ids })
			}
		)

		changed.push(...(selectMode.all ? state.bookmarks.spaces[collectionId].ids : ids))
	}

	return changed
}