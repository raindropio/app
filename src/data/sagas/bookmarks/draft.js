import { call, put, takeEvery, select } from 'redux-saga/effects'
import Api from '../../modules/api'
import _ from 'lodash'

import {
	BOOKMARK_UPDATE_REQ, BOOKMARK_CREATE_REQ,
	BOOKMARK_DRAFT_LOAD_REQ, BOOKMARK_DRAFT_LOAD_SUCCESS, BOOKMARK_DRAFT_LOAD_ERROR,
	BOOKMARK_DRAFT_COMMIT,
	BOOKMARK_DRAFT_COVER_UPLOAD,
	BOOKMARK_CREATE_SUCCESS,
	BOOKMARK_DRAFT_CHANGE
} from '../../constants/bookmarks'

//Requests
export default function* () {
	//draft
	yield takeEvery(BOOKMARK_DRAFT_LOAD_REQ, draftLoad)
	yield takeEvery(BOOKMARK_DRAFT_COMMIT, draftCommit)
	yield takeEvery(BOOKMARK_DRAFT_COVER_UPLOAD, draftCoverUpload)

	//bookmark
	yield takeEvery(BOOKMARK_CREATE_SUCCESS, enrichCreated)
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
			if (preventDuplicate && draft._id){
				const { ids=[] } = yield call(Api.get, `import/url/exists?url=${encodeURIComponent(draft._id)}`)

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
		const item = {
			collectionId: -1, //just to be sure that some collectionId is specified
			...newOne.item||{},
			link
		}

		//set draft by link
		yield put({
			type: BOOKMARK_DRAFT_LOAD_SUCCESS,
			_id: draft._id,
			item
		})

		//create new bookmark automatically
		if (autoCreate)
			yield put({
				type: BOOKMARK_DRAFT_COMMIT,
				_id: draft._id
			})
		else
			yield enrichCreated({
				draft: draft._id,
				item,
				overrideEmpty: true
			})
	} catch (error) {
		yield put({
			type: BOOKMARK_DRAFT_LOAD_ERROR,
			_id: draft._id,
			error
		});
	}
}

function* draftCommit({ _id, item, changedFields, ignore=false, onSuccess, onFail}) {
	if (ignore) return;

	//new
	if (!item._id)
		yield put({
			type: BOOKMARK_CREATE_REQ,
			draft: _id,
			obj: item,
			onSuccess, onFail
		})
	//update
	else
		yield put({
			type: BOOKMARK_UPDATE_REQ,
			_id: item._id,
			set: _.pick(item, changedFields),
			onSuccess, onFail
		})
}

function* draftCoverUpload({ _id, cover, ignore=false, onSuccess, onFail }) {
	if (ignore) return

	try{
		const state = yield select()
		const draft = state.bookmarks.getIn(['drafts', _id])
		if (!draft || !draft.item._id) throw new Error('draft is new, so it should be saved first to upload cover')

		const { item={} } = yield call(Api.upload, `raindrop/${draft.item._id}/cover`, { cover }, { timeout: 0 })

		yield put({
			type: BOOKMARK_UPDATE_REQ,
			_id: draft.item._id,
			set: {
				media: item.media,
				coverId: item.coverId,
				cover: item.cover
			},
			onSuccess, onFail
		});
	} catch (error) {
		onFail(error)
	}
}

/*
	When brand new bookmark is saved (or unsaved yet) it can be unparsed yet, so it can look pretty empty
	This method parse esential details and replace them (if empty) on draft
	It should be called exactly after 'new' draft saved (locally) or after actual create of bookmark
*/
function* enrichCreated({ draft, item, overrideEmpty }) {
	if (!draft) return

	try{
		const parse = yield call(Api.get, 'import/url/parse?url='+encodeURIComponent(draft))
		if (parse.error) return

		let changed = {}

		//set title
		if (parse.item.title && !item.title && overrideEmpty)
			changed.title = parse.item.title

		//set excerpt
		if (parse.item.excerpt && !item.excerpt && overrideEmpty)
			changed.excerpt = parse.item.excerpt

		//set cover/media
		if (parse.item.media && parse.item.media.length){
			changed.media = parse.item.media
			changed.cover = parse.item.media[0].link
			changed.coverId = 0
		}

		if (!Object.keys(changed))
			return

		//set changes
		yield put({
			type: BOOKMARK_DRAFT_CHANGE,
			_id: draft,
			changed,
			enrich: true
		})

		//when bookmark is brand new, we don't want to save this changes automatically
		//but otherwise absolutely must
		if (item._id)
			yield put({
				type: BOOKMARK_DRAFT_COMMIT,
				_id: draft
			})
	} catch (error) {}
}