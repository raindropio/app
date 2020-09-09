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

function* draftLoad({ newOne, ignore=false, ...draft }) {
	if (ignore) return;

	try{
		//config for newly created
		const { autoCreate = true, preventDuplicate = true } = newOne

		let _id, link

		//Known exact bookmark id
		if (Number.isInteger(parseInt(draft._id)))
			_id = draft._id
		//Need to find out by link only
		else {
			if (preventDuplicate){
				const { ids=[] } = yield call(Api.post, 'check/url', { url: draft._id })

				//existing
				if (ids.length)
					_id = ids[0]
			}
			
			//not found, it's new
			if (!_id)
				link = draft._id				
		}

		//Existing bookmark
		if (_id) {
			const { item={} } = yield call(Api.get, 'raindrop/'+_id)

			yield put({
				type: BOOKMARK_DRAFT_LOAD_SUCCESS,
				_id: draft._id,
				item
			})

			return
		}

		//New
		if (link) {
			//set draft by link
			yield put({
				type: BOOKMARK_DRAFT_LOAD_SUCCESS,
				_id: draft._id,
				item: {
					collectionId: -1,
					...newOne.item||{},
					link
				}
			})

			//create new bookmark automatically
			if (autoCreate)
				yield put({
					type: BOOKMARK_DRAFT_COMMIT,
					_id: draft._id
				})
		}
	} catch (error) {
		yield put({
			type: BOOKMARK_DRAFT_LOAD_ERROR,
			_id: draft._id,
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