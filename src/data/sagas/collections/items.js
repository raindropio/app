import { all, call, put, takeEvery, select } from 'redux-saga/effects'
import Api from '../../modules/api'
import { removeCollection } from './single'
import _ from 'lodash-es'

import {
	COLLECTIONS_LOAD_REQ, COLLECTIONS_LOAD_SUCCESS, COLLECTIONS_LOAD_ERROR,
	COLLECTIONS_REFRESH_REQ,
	COLLECTIONS_COLLAPSE_ALL,
	COLLECTIONS_REORDER,
	COLLECTIONS_REMOVE_ALL,

	COLLECTION_DRAFT_LOAD_REQ
} from '../../constants/collections'

//Requests
export default function* () {
	//items, takeEvery is important here!
	yield takeEvery([
		COLLECTIONS_LOAD_REQ,
		COLLECTIONS_REFRESH_REQ, 
		COLLECTION_DRAFT_LOAD_REQ
	], loadCollections)

	yield takeEvery(COLLECTIONS_COLLAPSE_ALL, collapseAll)
	yield takeEvery(COLLECTIONS_REORDER, reorderAll)

	yield takeEvery(COLLECTIONS_REMOVE_ALL, removeAllCollections)
}

export function* loadCollections({ dontLoadCollections=false, onSuccess, onFail }) {
	if (dontLoadCollections)
		return;

	try {
		//Load Get
		const [collections, stat={}, user={}] = yield all([
			call(Api.get, 'collections/all'),
			call(Api.get, 'user/stats'),
			call(Api.get, 'user')
		])

		//Prepare default collections
		const state = yield select()
		const defColls = state.collections.defaults.map((item)=>{
			//count
			if (stat.items){
				const statIndex = (stat.items||[]).findIndex((a)=>a._id==item._id)
				if (statIndex!=-1)
					return item.set('count', stat.items[statIndex].count)
			}

			return item;
		})

		yield put({
			type: COLLECTIONS_LOAD_SUCCESS, 
			items: [
				...defColls,
				...collections.items||[],
			],
			groups: user.user.groups,
			user: user.user,
			onSuccess,
			onFail
		});
	} catch (error) {
		yield put({ type: COLLECTIONS_LOAD_ERROR, error, onSuccess, onFail });
	}
}

function* collapseAll({ ignore=false }){
	if (ignore) return

	yield call(Api.put, 'collections', { expanded: false }) 
}

function* reorderAll({ ignore=false, method }){
	if (ignore) return

	yield call(Api.put, 'collections', { sort: method }) 
}

export function* removeAllCollections({ ignore=false, onSuccess, onFail }){
	if (ignore) return

	try{
		const { collections: { items } } = yield select()

		const root = _.filter(
			items,
			({ _id, parentId, access: { level } })=>
				_id == -1 || (_id > 0 && level >= 3 && !parentId)
		)

		for(const { _id } of root)
			yield removeCollection({ _id })

		if (onSuccess)
			onSuccess()
	} catch (error) {
		if (onFail)
			onFail(error)
	}
}