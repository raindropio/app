import { call, put, takeEvery, select, all } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../../modules/api'
import ApiError from '../../modules/error'

import {
	findGroupByCollection,
	isGroupId
} from '../../helpers/collections'

import {
	userIsPro,
	onlyForProUsersCheck
} from './utils'

import {
	COLLECTION_CREATE_REQ, COLLECTION_CREATE_SUCCESS, COLLECTION_CREATE_ERROR,
	COLLECTION_UPDATE_REQ, COLLECTION_UPDATE_SUCCESS, COLLECTION_UPDATE_ERROR,
	COLLECTION_REMOVE_REQ, COLLECTION_REMOVE_SUCCESS, COLLECTION_REMOVE_ERROR,

	COLLECTION_TOGGLE, COLLECTION_REORDER, COLLECTION_CHANGE_VIEW,

	GROUP_APPEND_COLLECTION, GROUP_REMOVE_COLLECTION,
	COLLECTIONS_SAVE_ORDER
} from '../../constants/collections'

//Requests
export default function* () {
	//single
	yield takeEvery(COLLECTION_CREATE_REQ, createCollection)
	yield takeEvery(COLLECTION_UPDATE_REQ, updateCollection)
	yield takeEvery(COLLECTION_REMOVE_REQ, removeCollection)

	//helpers
	yield takeEvery(COLLECTION_TOGGLE, toggleCollection)
	yield takeEvery(COLLECTION_REORDER, reorderCollection)
	yield takeEvery(COLLECTION_CHANGE_VIEW, changeViewCollection)
}

function* createCollection({obj={}, ignore=false, onSuccess, onFail}) {
	if (ignore)
		return;

	try{
		var groupId = 'g1'
		if (obj.parentId){
			//Move to specific group?
			if (isGroupId(obj.parentId)){
				groupId = obj.parentId
				delete obj.parentId
			}
			//Make child of specific collection
			else {
				const isPro = yield userIsPro()
				if (isPro)
					groupId = ''
			}
		}

		const {item={}, result=false, error, errorMessage } = yield call(Api.post, 'collection', obj)

		if (!result)
			throw new ApiError(error, errorMessage||'cant create collection')

		item.new = true

		if (groupId)
			yield put({
				type: GROUP_APPEND_COLLECTION,
				_id: groupId,
				collectionId: item._id,
				last: true
			})
		//Expand parent
		else if (obj.parentId)
			yield put({
				type: COLLECTION_UPDATE_REQ,
				_id: obj.parentId,
				set: {
					expanded: true
				}
			})

		yield put({
			type: COLLECTION_CREATE_SUCCESS,
			_id: item._id,
			item,
			onSuccess, onFail
		})
	} catch (error) {
		yield put({
			type: COLLECTION_CREATE_ERROR,
			obj,
			error,
			onSuccess, onFail
		});
	}
}

function* updateCollection({_id=0, set={}, ignore=false, quiet=false, onSuccess, onFail}) {
	if ((ignore)||(_id<=0))
		return;

	try{
		const {item={}, result, error, errorMessage} = yield call(Api.put, 'collection/'+_id, set)

		if (!result)
			throw new ApiError(error, errorMessage||'cant update collection')

		if (!quiet)
			yield put({
				type: COLLECTION_UPDATE_SUCCESS,
				_id: _id,
				item: item,
				changedFields: Object.keys(set),
				onSuccess, onFail
			})
	} catch (error) {
		if (!quiet)
			yield put({
				type: COLLECTION_UPDATE_ERROR,
				_id: _id,
				changedFields: Object.keys(set),
				error,
				onSuccess, onFail
			})
	}
}

function* removeCollection({_id=0, ignore=false, onSuccess, onFail}) {
	if ((ignore)||(_id<=0 && _id!=-99))
		return;

	try{
		const {result, error, errorMessage} = yield call(Api.del, 'collection/'+_id)
		if (!result)
			throw new ApiError(error, errorMessage||'cant remove collection')

		yield put({
			type: COLLECTION_REMOVE_SUCCESS,
			_id: _id,
			onSuccess, onFail
		});
	} catch (error) {
		yield put({
			type: COLLECTION_REMOVE_ERROR,
			_id: _id,
			error,
			onSuccess, onFail
		});
	}
}

function* toggleCollection({_id=0, expanded, ignore=false}) {
	if ((ignore)||(_id<=0))
		return;

	try{
		yield put({
			type: COLLECTION_UPDATE_REQ,
			_id: _id,
			quiet: true,
			set: {
				expanded: expanded
			}
		})
	} catch(error) {
		yield put({
			type: COLLECTION_UPDATE_ERROR,
			_id: _id,
			changedFields: [],
			error
		});
	}
}

function* changeViewCollection({_id=0, view, ignore=false}) {
	if ((ignore)||(_id<=0))
		return;

	try{
		yield put({
			type: COLLECTION_UPDATE_REQ,
			_id: _id,
			set: {
				view
			}
		})
	} catch(error) {
		yield put({
			type: COLLECTION_UPDATE_ERROR,
			_id: _id,
			changedFields: [],
			error
		});
	}
}

function* reorderCollection({_id=0, ignore=false, to, after, before}) {
	if ((ignore)||(_id<=0))
		return;

	try{
		const state = yield select()
		const collection = state.collections.getIn(['items', _id])

		if (!collection)
			throw new ApiError(collection.error, collection.errorMessage||'collection not found')

		//TO
		var mode;
		if (to)
			mode = (isGroupId(to) ? 'moveToGroup' : 'moveToCollection')
		if (after||before)
			mode = 'reorder'

		switch(mode){
			case 'moveToGroup':
				if ( _.findIndex(state.collections.groups, ({_id})=>_id==to) ==-1 )
					throw new ApiError('not_found', 'group not found')

				yield all([
					//make root
					put({
						type: COLLECTION_UPDATE_REQ,
						_id: _id,
						set: { parentId: 'root' }
					}),
					//append collection to particular group
					put({
						type: GROUP_APPEND_COLLECTION,
						_id: to,
						collectionId: _id
					})
				])
			break;

			case 'moveToCollection':
				yield onlyForProUsersCheck()

				yield all([
					//remove collection from groups
					put({
						type: GROUP_REMOVE_COLLECTION,
						_id: to,
						collectionId: _id
					}),

					//make root
					put({
						type: COLLECTION_UPDATE_REQ,
						_id: _id,
						set: { parentId: parseInt(to) }
					})
				])
			break;

			case 'reorder':{
				const target = state.collections.getIn(['items', parseInt(after||before)])||{}
				if (target._id<=0 || !target._id)
					throw new ApiError('not_found', 'target not found')

				yield onlyForProUsersCheck()

				let actions = []

				//remove from groups
				actions.push(
					put({
						type: GROUP_REMOVE_COLLECTION,
						collectionId: collection._id
					})
				)

				//Move to root collection
				if (!target.parentId){
					//make original also root
					if (collection.parentId)
						actions.push(
							put({
								type: COLLECTION_UPDATE_REQ,
								_id: _id,
								set: { parentId: 'root' }
							}),
						)

					actions.push(
						put({
							type: GROUP_APPEND_COLLECTION,
							_id: findGroupByCollection(state.collections.groups, target._id)._id,
							collectionId: _id,
							after: parseInt(after),
							before: parseInt(before)
						})
					)
				}
				//Make nested children and reorder
				else{
					var newSort = parseFloat(target.sort)
					if (before)
						newSort = newSort - 0.5
					else
						newSort = newSort + 0.5

					actions.push(
						put({
							type: COLLECTION_UPDATE_REQ,
							_id: collection._id,
							set: {
								parentId: parseInt(target.parentId),
								sort: newSort
							}
						})
					)

					actions.push(
						put({
							type: COLLECTIONS_SAVE_ORDER
						})
					)
				}

				yield all(actions)
			}
		}
	} catch(error) {
		yield put({
			type: COLLECTION_UPDATE_ERROR,
			_id: _id,
			changedFields: [],
			error
		});
	}
}