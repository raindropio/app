import _ from 'lodash'
import { call, put, takeEvery, select, throttle, all } from 'redux-saga/effects'
import Api from '../../modules/api'
import { getUrl } from '../../helpers/bookmarks'

import {
	SPACE_LOAD_PRE, SPACE_LOAD_REQ, SPACE_LOAD_SUCCESS, SPACE_LOAD_ERROR,
	SPACE_REFRESH_REQ,
	SPACE_NEXTPAGE_REQ, SPACE_NEXTPAGE_SUCCESS, SPACE_NEXTPAGE_ERROR,
	SPACE_CHANGE_SORT,
	SPACE_VIEW_TOGGLE,
	SPACE_VIEW_CONFIG,

	BOOKMARK_UPDATE_SUCCESS
} from '../../constants/bookmarks'
import { USER_UPDATE_REQ } from '../../constants/user'

//Requests
export default function* () {
	//space
	yield takeEvery([
		SPACE_LOAD_PRE,
		SPACE_REFRESH_REQ
	], preLoadSpace)

	yield takeEvery([
		SPACE_LOAD_REQ,
		SPACE_NEXTPAGE_REQ,
		SPACE_CHANGE_SORT
	], loadSpace)

	yield throttle(1000, BOOKMARK_UPDATE_SUCCESS, maybeRefeshSpace)

	yield takeEvery(SPACE_VIEW_TOGGLE, viewToggle)
	yield takeEvery(SPACE_VIEW_CONFIG, viewConfig)
}

function* preLoadSpace(action) {
	if (action.ignore) return

	try{
		const { lastAction, version } = yield call(Api.get, `collection/${parseInt(action.spaceId)}/lastAction`)

		yield put({
			...action,
			type: SPACE_LOAD_REQ,
			lastAction,
			version
		})
	} catch (error) {
		yield put({
			...action,
			type: SPACE_LOAD_ERROR,
			error
		})
	}
}

function* loadSpace({spaceId, query, ignore=false}) {
	if (ignore) return

	try {
		const { items=[] } = yield call(Api.get, `raindrops/${getUrl(spaceId, query)}`);

		yield put({
			type: (query.page ? SPACE_NEXTPAGE_SUCCESS : SPACE_LOAD_SUCCESS),
			spaceId: spaceId,
			items: items,
			query
		})
	} catch (error) {
		yield put({
			type: (query.page ? SPACE_NEXTPAGE_ERROR : SPACE_LOAD_ERROR),
			spaceId: spaceId,
			error,
			query
		})
	}
}

function* maybeRefeshSpace({spaceId, movedFromSpaceId}) {
	//Bookmark is moved from one collection, to another, now we need to refresh destination collection
	if (movedFromSpaceId && movedFromSpaceId.length){
		const operations = [];

		(Array.isArray(spaceId) ? spaceId : [spaceId])
			.forEach(_id => {
				operations.push(
					...[
						put({type: SPACE_REFRESH_REQ, spaceId: String(parseInt(_id))}),
						put({type: SPACE_REFRESH_REQ, spaceId: String(parseInt(_id+'s'))})
					]
				)
			})

		yield all(operations)
	}
}

function* viewToggle({ spaceId, field }) {
	const { config, collections } = yield select()
	const collection = collections.items[parseInt(spaceId)]

	if (!collection) return

	let raindrops_hide = [ ...config.raindrops_hide ]
	let view_field = `${collection.view}_${field}`

	if (raindrops_hide.includes(view_field))
		raindrops_hide = _.without(raindrops_hide, view_field)
	else
		raindrops_hide.push(view_field)

	yield viewConfig({ spaceId, raindrops_hide })
}

function* viewConfig({ spaceId, ...config }) {
	yield put({
		type: USER_UPDATE_REQ,
		user: {
			config
		}
	})
}