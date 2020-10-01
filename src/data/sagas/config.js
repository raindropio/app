import _ from 'lodash'
import { put, takeLatest } from 'redux-saga/effects'
import { CONFIG_SET_LASTCOLLECTION } from '../constants/config'
import { USER_UPDATE_REQ } from '../constants/user'
import { COLLECTION_CHANGE_VIEW } from '../constants/collections'
import { SPACE_CHANGE_SORT, BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS } from '../constants/bookmarks'

export default function* () {
    //last_collection
    yield takeLatest(CONFIG_SET_LASTCOLLECTION, userUpdate('spaceId', 'last_collection', (val)=>parseInt(val)!=-99))
    yield takeLatest([BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS], userUpdate('item.collectionId', 'last_collection', (val)=>parseInt(val)!=-99))

    yield takeLatest(COLLECTION_CHANGE_VIEW, userUpdate('view', 'raindrops_view'))

    yield takeLatest(SPACE_CHANGE_SORT, userUpdate('sort', 'raindrops_sort'))
}

const userUpdate = function(from, to, filter) {
    return function* (action) {
        const val = _.at(action, from)[0]

        if (typeof val == 'undefined')
            return

        if (typeof filter == 'function' &&
            !filter(val))
            return

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