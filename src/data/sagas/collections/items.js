import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import Api from '../../modules/api'
import ApiError from '../../modules/error'
import _ from 'lodash-es'

import {
	COLLECTIONS_LOAD_REQ, COLLECTIONS_LOAD_SUCCESS, COLLECTIONS_LOAD_ERROR,
	COLLECTIONS_REFRESH_REQ,

	COLLECTION_DRAFT_LOAD_REQ, COLLECTION_UPDATE_REQ,
} from '../../constants/collections'

//Requests
export default function* () {
	//items, takeEvery is important here!
	yield takeEvery([
		COLLECTIONS_LOAD_REQ,
		COLLECTIONS_REFRESH_REQ, 
		COLLECTION_DRAFT_LOAD_REQ
	], loadItems)
}

function* loadItems({dontLoadCollections=false}) {
	if (dontLoadCollections)
		return;

	try {
		//Load Get
		const [root, child, stat={}, user={}] = yield all([
			call(Api.get, 'collections'),
			call(Api.get, 'childrens'),
			call(Api.get, 'stat'),
			call(Api.get, 'user')
		])

		if ((!root.result)||(!child.result)||(!stat.result)||(!user.result))
			throw new ApiError(
				root.error||child.error||stat.error||user.error,
				root.errorMessage||child.errorMessage||stat.errorMessage||user.errorMessage||'can\'t load collections'
			)

		//Prepare default collections
		const state = yield select()
		const defColls = state.collections.defaults.map((item)=>{
			//view
			const view = state.config.raindrops_view
			if (view)
				item = item.set('view', view)

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
				...root.items||[],
				...child.items||[]
			],
			groups: user.user.groups,
			user: user.user
		});
	} catch (error) {
		yield put({type: COLLECTIONS_LOAD_ERROR, error});
	}
}