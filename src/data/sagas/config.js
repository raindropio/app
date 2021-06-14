import _ from 'lodash'
import { put, takeLatest, select } from 'redux-saga/effects'
import { CONFIG_SET_LASTCOLLECTION } from '../constants/config'
import { USER_UPDATE_REQ } from '../constants/user'
import { COLLECTION_CHANGE_VIEW } from '../constants/collections'
import { SPACE_CHANGE_SORT, BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS } from '../constants/bookmarks'

export default function* () {
    //last_collection
    yield takeLatest(CONFIG_SET_LASTCOLLECTION, userUpdate(({spaceId})=>spaceId, 'last_collection', (val)=>parseInt(val)!=-99))
    yield takeLatest(
        [BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS],
        userUpdate(
            ({item})=>{
                const items = Array.isArray(item)?item:[item]
                if (!items.length) return
                return items[0].collectionId
            },
            'last_collection',
            (val)=>parseInt(val)!=-99
        )
    )

    yield takeLatest(COLLECTION_CHANGE_VIEW, userUpdate(({view})=>view, 'raindrops_view'))

    yield takeLatest(SPACE_CHANGE_SORT, userUpdate(({sort})=>sort, 'raindrops_sort'))
}

const userUpdate = function(getVal, to, filter) {
    return function* (action) {
        const val = getVal(action)

        if (typeof val == 'undefined')
            return

        if (typeof filter == 'function' &&
            !filter(val))
            return

        const state = yield select()

        if (!state.config || 
            state.config[to] != val)
            yield put({
                type: USER_UPDATE_REQ, 
                user: {
                    config:{
                        [to]: val
                    }
                }
            })
    }
}