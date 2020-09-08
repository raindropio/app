import { call, put, takeEvery, select } from 'redux-saga/effects'
import Api from '../../modules/api'
import _ from 'lodash'

import {
	BOOKMARK_UPDATE_REQ, BOOKMARK_CREATE_REQ,
	BOOKMARK_DRAFT_LOAD_REQ, BOOKMARK_DRAFT_LOAD_SUCCESS, BOOKMARK_DRAFT_LOAD_ERROR, BOOKMARK_DRAFT_COMMIT
} from '../../constants/bookmarks'

//Requests
export default function* () {
	//draft
	yield takeEvery(BOOKMARK_DRAFT_LOAD_REQ, draftLoad)
	yield takeEvery(BOOKMARK_DRAFT_COMMIT, draftCommit)
}

function* draftLoad({_id, obj, config, ignore=false}) {
	if (ignore) return;

	try{
		//load by link
		if (!Number.isInteger(parseInt(_id))){
			const { ids=[] } = yield call(Api.post, 'check/url', { url: _id })

			//existing bookmark, load it by id
			if (ids.length)
				_id = ids[0]
			//not found, it's new
			else{
				//config
				const { save = true } = config

				//set draft by link
				yield put({
					type: BOOKMARK_DRAFT_LOAD_SUCCESS,
					_id,
					item: {
						collectionId: -1,
						...obj,
						link: _id
					}
				})

				//save new bookmark automatically
				if (save)
					yield put({
						type: BOOKMARK_DRAFT_COMMIT,
						_id
					})

				return
			}
		}

		//load exact ID
		const { item={} } = yield call(Api.get, 'raindrop/'+_id)

		yield put({
			type: BOOKMARK_DRAFT_LOAD_SUCCESS,
			_id,
			item
		});
	} catch (error) {
		yield put({
			type: BOOKMARK_DRAFT_LOAD_ERROR,
			_id,
			error
		});
	}
}

function* draftCommit({ _id, onSuccess, onFail}) {
	const state = yield select()
	const draft = state.bookmarks.getIn(['drafts', _id])
	if (!draft) return

	//new
	if (!draft.item._id)
		return yield put({
			type: BOOKMARK_CREATE_REQ,
			draft: _id,
			obj: draft.item,
			onSuccess, onFail
		})

	//update
	if (draft.changedFields.length)
		return yield put({
			type: BOOKMARK_UPDATE_REQ,
			_id: draft.item._id,
			set: _.pick(draft.item, draft.changedFields),
			onSuccess, onFail
		})

	onSuccess(draft.item)
}