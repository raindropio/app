import { call, put, select, takeLatest } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../modules/api'
import * as c from '../constants/import'
import { loadCollections, removeAllCollections } from './collections/items'
import { createCollection } from './collections/single'

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
	const { import: { mode } } = yield select()
	if (mode !== 'from_scratch') return

	yield removeAllCollections({})
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
		//create or find existing collection
		const collection = yield ensureCollection(
			mode, 
			{ title, parentId }, 
			existingCollections
		)

		//increment progress for 1 collection
		yield put({
			type: c.IMPORT_PARCEL_SAVE_PROGRESS,
			folders: 1
		})

		//save all bookmarks
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
	//try to find existing collection with same name and parent
	if (mode === 'new'){
		const found = (
			obj.parentId ?
				existingCollections
					.filter(({parentId}) => parentId == obj.parentId) :
				existingCollections
		)
			.find(({ title })=>title === obj.title)

		if (found)
			return found
	}

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
		let items = chunk.map(item=>({
			...item,
			collectionId
		}))

		//prevent duplicates
		if (mode === 'new'){
			const { duplicates=[] } = yield call(Api.post, 'import/url/exists', {
				urls: items.map(({ link })=>link)
			})

			if (duplicates.length)
				items = items.filter(({ link })=>
					!duplicates.some(dup=>
						dup.link == link
					)
				)
		}

		//create bookmarks
		if (items.length)
			yield call(Api.post, 'raindrops', { items })

		//update progress
		yield put({
			type: c.IMPORT_PARCEL_SAVE_PROGRESS,
			bookmarks: chunk.length
		})
	}
}