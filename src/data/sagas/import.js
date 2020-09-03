import { call, put, select, takeLatest } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../modules/api'
import * as c from '../constants/import'
import { loadCollections } from './collections/items'
import { createCollection, removeCollection } from './collections/single'

export default function* () {
	yield takeLatest(c.IMPORT_FILE_UPLOAD_REQ, fileUpload)
	yield takeLatest(c.IMPORT_PARCEL_SAVE_REQ, parcelSave)
}

function* fileUpload({ file, ignore=false, onSuccess, onFail }) {
    if (ignore) return

	try{
		const { items=[], count } = yield call(Api.upload, 'import/file', { import: file })

		yield put({
			type: c.IMPORT_FILE_UPLOAD_SUCCESS,
			items,
			count,
			onSuccess, onFail
		});
	} catch (error) {
		yield put({
			type: c.IMPORT_FILE_UPLOAD_ERROR,
			error,
			onSuccess, onFail
		});
	}
}

function* parcelSave({ ignore=false, onSuccess, onFail }) {
	if (ignore) return
	
	try{
		yield loadCollections({})
		yield from_scratch()
		yield process()

		//done
		yield put({
			type: c.IMPORT_PARCEL_SAVE_SUCCESS,
			onSuccess, onFail
		})
	}catch (error) {
		yield put({
			type: c.IMPORT_PARCEL_SAVE_ERROR,
			error,
			onSuccess, onFail
		})
	}
}

//remove all my collections if mode is from_scratch
function* from_scratch() {
	const { import: { mode }, collections: { items } } = yield select()
	if (mode !== 'from_scratch') return

	const root = _.filter(
		items,
		({ _id, parentId, access: { level } })=>
			_id == -1 || (_id > 0 && level >= 3 && !parentId)
	)

	for(const { _id } of root)
		yield removeCollection({ _id })
}

function* process(items, parentId) {
	const state = yield select()

	//get collections user can write to
	const existingCollections = _.filter(
		state.collections.items,
		({ _id, access: { level } })=>_id > 0 && level >= 3
	)

	//import state
	let { import: { file, mode } } = state

	//process each
	for(const { title='', folders=[], bookmarks=[] } of items||file.items){
		const collection = yield ensureCollection(
			mode, 
			{ title, parentId }, 
			existingCollections
		)

		yield processBookmarks(
			mode,
			bookmarks,
			collection._id
		)

		//process deeper
		if (folders)
			yield process(folders, collection._id)
	}
}

//find or create collection
function* ensureCollection(mode, obj, existingCollections) {
	//try to find existing collection with same name
	// if (mode === 'new'){

	// }

	//create new collection if nothing found
	return yield createCollection({
		obj,
		nestedOnlyInPro:false
	})
}

//process bookmarks by chunks
function* processBookmarks(mode, bookmarks, collectionId) {
	const chunks = _.chunk(bookmarks, 1000)

	for(const chunk of chunks){
		//create bookmarks
		yield call(Api.post, 'raindrops', {
			items: chunk.map(item=>({
				...item,
				collectionId
			}))
		})

		//update progress
		yield put({
			type: c.IMPORT_PARCEL_SAVE_PROGRESS,
			inc: chunk.length
		})
	}
}