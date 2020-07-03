import { call, put, takeEvery, select, all } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../../modules/api'
import ApiError from '../../modules/error'
import { findOutermost } from '../../helpers/collections'

import {
    COLLECTIONS_SELECTED_MERGE,
    COLLECTIONS_SELECTED_REMOVE,
    COLLECTIONS_SELECTED_FAILED,

    COLLECTIONS_UNSELECT_ALL,
    COLLECTIONS_REFRESH_REQ,
    COLLECTION_REMOVE_SUCCESS
} from '../../constants/collections'

import {
    SPACE_REFRESH_REQ
} from '../../constants/bookmarks'

export default function* () {
    yield takeEvery(COLLECTIONS_SELECTED_MERGE, merge)
    yield takeEvery(COLLECTIONS_SELECTED_REMOVE, remove)
}

function* remove({ onSuccess, onFail }) {
    try{
        const { collections: { selectMode } } = yield select()
        
        //fail when nothing selected
        if (!selectMode.ids.length)
            throw new ApiError({ status: 400, error: 'ids', errorMessage: 'nothing selected'})

        //split by 20 items
        for(const ids of _.chunk(selectMode.ids, 20)){
            const { result=false } = yield call(
                Api.del,
                'collections',
                { ids },
                { timeout: 0 }
            )

            if (result)
                yield put({
                    type: COLLECTION_REMOVE_SUCCESS,
                    _id: ids
                })
        }

        yield all([
            put({ type: COLLECTIONS_UNSELECT_ALL }),
            put({ type: COLLECTIONS_REFRESH_REQ })
        ])

        onSuccess && onFail(onSuccess)
    } catch(error) {
        onFail && onFail(error)

		yield put({
            type: COLLECTIONS_SELECTED_FAILED,
            error
		})
    }
}

function* merge({ onSuccess, onFail }) {
    try{
        const { collections: { selectMode, items } } = yield select()
        
        //fail when nothing selected
        if (!selectMode.ids.length)
            throw new ApiError({ status: 400, error: 'ids', errorMessage: 'nothing selected'})

        //find outermost collection, where we merge all other ones
        const to = findOutermost(items, selectMode.ids)

        //split by 20 items
        for(const ids of _.chunk(_.without(selectMode.ids, to), 20)){
            const { result=false } = yield call(
                Api.put,
                'collections/merge',
                { ids, to },
                { timeout: 0 }
            )
    
            if (result)
                yield put({
                    type: COLLECTION_REMOVE_SUCCESS,
                    _id: ids
                })
        }

        yield all([
            put({ type: COLLECTIONS_UNSELECT_ALL }),
            put({ type: COLLECTIONS_REFRESH_REQ }),
            put({ type: SPACE_REFRESH_REQ, spaceId: String(to) })
        ])

        onSuccess && onFail(onSuccess)
    } catch(error) {
        onFail && onFail(error)

		yield put({
            type: COLLECTIONS_SELECTED_FAILED,
            error
		})
    }
}