import wrapFunc from '../utils/wrapFunc'
import * as c from '../constants/import'

export const upload = (file, onSuccess, onFail)=>({
    type: c.IMPORT_FILE_UPLOAD_REQ,
    file,
    onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const parcelMode = (mode)=>({
    type: c.IMPORT_PARCEL_MODE,
    mode
})

export const parcelSave = (onSuccess, onFail)=>({
    type: c.IMPORT_PARCEL_SAVE_REQ,
    onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const cancel = ()=>({
    type: c.IMPORT_CANCEL
})