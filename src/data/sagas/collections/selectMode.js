import { call, put, takeEvery, select, all } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../../modules/api'
import ApiError from '../../modules/error'

import {
    COLLECTIONS_SELECTED_MERGE,
    COLLECTIONS_SELECTED_REMOVE,
    COLLECTIONS_SELECTED_FAILED,

    COLLECTIONS_UNSELECT_ALL,
    COLLECTION_REMOVE_SUCCESS
} from '../../constants/collections'

export default function* () {
    yield takeEvery(COLLECTIONS_SELECTED_REMOVE, remove)
}

function* remove({ onSuccess, onFail }) {
    try{
        const { collections: { selectMode } } = yield select()
        
        //fail when nothing selected
        if (!selectMode.ids.length)
            throw new ApiError('ids', 'nothing selected')

        //split by 100 items
        for(const ids of _.chunk(selectMode.ids, 100)){
            const { result=false, error, errorMessage, ...etc } = yield call(
                Api.del,
                'collections',
                { ids }
            )
    
            if (!result)
                throw new ApiError(error, errorMessage||'cant bulk remove')

            yield put({
                type: COLLECTION_REMOVE_SUCCESS,
                _id: etc.ids
            })
        }

        onSuccess && onFail(onSuccess)
    } catch(error) {
        onFail && onFail(error)

		yield put({
            type: COLLECTIONS_SELECTED_FAILED,
            error
		})
    }
}