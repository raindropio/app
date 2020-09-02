import { call, put, select, takeLatest } from 'redux-saga/effects'
import Api from '../modules/api'
import * as c from '../constants/import'

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
		const { import: { file: { items } } } = yield select()

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