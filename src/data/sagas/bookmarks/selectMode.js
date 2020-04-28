import { call, put, takeEvery, select, all } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../../modules/api'
import ApiError from '../../modules/error'

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

function* byCollectionId(state) {
	const { ids } = state.bookmarks.selectMode

	return _.toPairs(
		_.groupBy(
			_.pick(state.bookmarks.elements, ids),
			'collectionId'
		)
	).map(([cid, items])=>
		[ cid, items.map(({_id})=>_id) ]
	)
}

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

			//Send update request
			const state = yield select()
			const fields = set(action)

			//Generate side effects
			let mutations = []

			for(const [collectionId, ids] of yield byCollectionId(state)){
				const { result=false, modified=0, error, errorMessage } = yield call(Api.put, `raindrops/${collectionId}`, {
					...fields,
					ids
				})

				if (!result)
					throw new ApiError(error, errorMessage||'cant update selected bookmarks')

				if (modified)
					mutations.push(
						..._.map(ids, (_id)=>{
							let item = {...state.bookmarks.elements[_id], ...state.bookmarks.meta[_id]}
		
							if (mutate)
								item = mutate(action, item)
							else
								item = {...item, ...fields}
		
							return put({
								type: BOOKMARK_UPDATE_SUCCESS,
								_id,
								item
							})
						})
					)
			}

			mutations.unshift(put({
				type: SELECT_MODE_DISABLE
			}))

			yield all(mutations)

			typeof onSuccess == 'function' && onSuccess()
		}catch(e){
			console.log(e)
			typeof onFail == 'function' && onFail()
		}
	}
)

function* removeBookmarks({onSuccess, onFail}) {
	try{
		const state = yield select()

		//Mutations
		let mutations = []

		for(const [collectionId, ids] of yield byCollectionId(state)){
			const { result=false, modified=0, error, errorMessage } = yield call(Api.del, `raindrops/${collectionId}`, { ids })
			if (!result)
				throw new ApiError(error, errorMessage||'cant remove selected bookmarks')

			if (modified)
				mutations = _.map(ids, (_id)=>
					put({
						type: BOOKMARK_REMOVE_SUCCESS,
						_id
					})
				)
		}

		mutations.unshift(put({
			type: SELECT_MODE_DISABLE
		}))

		yield all(mutations)

		if (typeof onSuccess == 'function')
			onSuccess()
	}catch(e){
		if (typeof onFail == 'function')
			onFail()
	}
}