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
	COLLECTION_UPDATE_COUNT,
	COLLECTION_ADD_BLANK, COLLECTION_CREATE_FROM_BLANK, COLLECTION_REMOVE_BLANK,

	COLLECTION_TOGGLE, COLLECTION_REORDER, COLLECTION_CHANGE_VIEW, COLLECTIONS_EXPAND_TO,
	COLLECTION_COVER_UPLOAD_REQ,

	GROUP_APPEND_COLLECTION, GROUP_REMOVE_COLLECTION
} from '../../constants/collections'

import {
	BOOKMARK_CREATE_SUCCESS,
	BOOKMARK_UPDATE_SUCCESS,
	BOOKMARK_REMOVE_SUCCESS
} from '../../constants/bookmarks'

//Requests
export default function* () {
	//single
	yield takeEvery(COLLECTION_CREATE_REQ, createCollection)
	yield takeEvery(COLLECTION_UPDATE_REQ, updateCollection)
	yield takeEvery(COLLECTION_REMOVE_REQ, removeCollection)
	yield takeEvery(COLLECTION_ADD_BLANK, addBlank)
	yield takeEvery(COLLECTION_CREATE_FROM_BLANK, createFromBlank)
	yield takeEvery(COLLECTION_REMOVE_BLANK, removeBlank)

	//helpers
	yield takeEvery(COLLECTION_TOGGLE, toggleCollection)
	yield takeEvery(COLLECTION_REORDER, reorderCollection)
	yield takeEvery(COLLECTION_CHANGE_VIEW, changeViewCollection)
	yield takeEvery(COLLECTION_COVER_UPLOAD_REQ, uploadCover)

	//update collections count on bookmarks add/remove/reload
	yield takeEvery([ BOOKMARK_CREATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS ], actualizeCollectionCount)

	//update collections count on bookmark move
	yield takeEvery(BOOKMARK_UPDATE_SUCCESS, function*(params){
		const movedFromSpaceId = params.movedFromSpaceId ? (Array.isArray(params.movedFromSpaceId) ? params.movedFromSpaceId : [params.movedFromSpaceId]) : []

		if (movedFromSpaceId.length)
			yield actualizeCollectionCount(params)
	})
}

function* actualizeCollectionCount({ ignore, spaceId, movedFromSpaceId }) {
	if (ignore)
		return;

	let collections = (Array.isArray(spaceId) ? spaceId : [spaceId])
	if (movedFromSpaceId)
		collections.push(...(Array.isArray(movedFromSpaceId) ? movedFromSpaceId : [movedFromSpaceId]))

	const operations = []
	
	//affected collections
	for(const _id of collections){
		if (_id<=0) continue

		const { item={}, result=false } = yield call(Api.get, `collection/${_id}`)

		if (result)
			operations.push(put({
				type: COLLECTION_UPDATE_COUNT,
				_id,
				count: item.count
			}))
	}

	//system collections
	const { items={}, result=false } = yield call(Api.get, 'user/stats')
	if (result)
		operations.push(
			...items.map(({_id, count})=>
				put({
					type: COLLECTION_UPDATE_COUNT,
					_id,
					count
				})
			)
		)

	//run
	if (operations.length)
		yield all(operations)
}

export function* createCollection({obj={}, ignore=false, after, fromBlank=false, nestedOnlyInPro=true, onSuccess, onFail}) {
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
				if (isPro || !nestedOnlyInPro)
					groupId = ''
			}
		}

		const { item={} } = yield call(Api.post, 'collection', obj)

		item.new = true

		if (groupId)
			yield put({
				type: GROUP_APPEND_COLLECTION,
				_id: groupId,
				collectionId: item._id,
				...(after ? { after } : { last: true })
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

		//remove blank item
		if (fromBlank)
			yield put({
				type: COLLECTION_REMOVE_SUCCESS,
				_id: -101
			})

		return item
	} catch (error) {
		yield put({
			type: COLLECTION_CREATE_ERROR,
			obj,
			error,
			onSuccess, onFail
		})
	}
}

function* updateCollection({_id=0, set={}, ignore=false, quiet=false, onSuccess, onFail}) {
	if ((ignore)||(_id<=0))
		return;

	try{
		const { item={} } = yield call(Api.put, 'collection/'+_id, set)

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

export function* removeCollection({_id=0, ignore=false, onSuccess, onFail}) {
	if ((ignore)||(_id<=0 && _id!=-99))
		return;

	try{
		yield call(Api.del, 'collection/'+_id)

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

function* addBlank({ siblingId, asChild, ignore=false }) {
	if (ignore) return

	const state = yield select()

	//new item
	const item = {
		_id: -101,
		access: {
			draggable: true
		}
	}

	//add to first group by default
	let groupId = state.collections.getIn(['groups', 0, '_id'])

	//check maybe need to add to specific group?
	if (typeof siblingId == 'string')
		for(const group of state.collections.groups)
			if (group._id == siblingId){
				groupId = group._id
				break
			}

	//if sibling id is specified move it to specific position in the tree
	let after
	if (parseInt(siblingId) > 0){
		after = parseInt(siblingId)

		//should be in specific parent
		//prevent creating nested collection if non pro
		if (state.user.current.pro){
			const collection = state.collections.getIn(['items', after])
			if (collection){
				if (asChild){
					item.parentId = collection._id
					item.sort = -1
				}
				else if (collection.parentId){
					item.parentId = collection.parentId
					item.sort = collection.sort + 0.5
				}
			}
		}

		//group id
		for(const group of state.collections.groups)
			if (group.collections.includes(after))
				groupId = group._id
	}

	let actions = []

	//as root
	if (!item.parentId)
		actions.push({
			type: GROUP_APPEND_COLLECTION,
			_id: groupId,
			collectionId: item._id,
			...(after ? { after } : {}),
			ignore: true
		})
	else if (after)
		actions.push({
			type: COLLECTIONS_EXPAND_TO,
			_id: after,
			self: true
		})
	
	actions.push({
		type: COLLECTION_CREATE_SUCCESS,
		_id: -101,
		item: item
	})

	yield all(actions.map(action=>put(action)))
}

function* createFromBlank({ obj, ignore=false, onSuccess, onFail }) {
	if (ignore) return

	const blankId = -101
	const state = yield select()

	//is a child?
	const sort = state.collections.getIn(['items', blankId, 'sort'])
	let parentId = state.collections.getIn(['items', blankId, 'parentId'])

	//get group id if root
	if (!parentId) {
		for(const group of state.collections.groups)
			if (group.collections.includes(blankId))
				parentId = group._id
	}

	yield put({
		type: COLLECTION_CREATE_REQ,
		obj: {
			...obj,
			parentId,
			sort,
			order: sort
		},
		...(typeof parentId == 'string' ? { after: blankId } : {}),
		fromBlank: true,
		onSuccess, onFail
	})
}

function* removeBlank({ ignore=false }) {
	if (ignore) return

	yield put({
		type: COLLECTION_REMOVE_SUCCESS,
		_id: -101
	})
}

function* uploadCover({ _id=0, cover, ignore=false, onSuccess, onFail }) {
	if (ignore) return

	try{
		const { item={} } = yield call(Api.upload, `collection/${_id}/cover`, { cover }, { timeout: 0 })

		yield put({
			type: COLLECTION_UPDATE_REQ,
			_id,
			item: item,
			onSuccess, onFail
		});
	} catch (error) {
		yield put({
			type: COLLECTION_UPDATE_ERROR,
			_id,
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
	if (ignore) //don't check _id>0 because it needs to give ability to move blank collection (-101)
		return;

	try{
		const state = yield select()
		const collection = state.collections.getIn(['items', _id])

		//TO
		var mode;
		if (to)
			mode = (isGroupId(to) ? 'moveToGroup' : 'moveToCollection')
		if (after||before)
			mode = 'reorder'

		switch(mode){
			case 'moveToGroup':
				if ( _.findIndex(state.collections.groups, ({_id})=>_id==to) ==-1 )
					throw new ApiError({ status: 404, errorMessage: 'group not found' })

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
				if (!collection.access.draggable)
					throw new ApiError({ status: 403, errorMessage: 'collection is not draggable' })

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
						set: {
							parentId: parseInt(to),
							order: 0
						}
					}),

					put({
						type: COLLECTIONS_EXPAND_TO,
						_id: parseInt(to),
						self: true
					})
				])
			break;

			case 'reorder':{
				const target = state.collections.getIn(['items', parseInt(after||before)])||{}
				if (target._id<=0 || !target._id)
					throw new ApiError({status: 404, errorMessage: 'target not found'})

				let actions = []

				//remove from groups
				if (_id > 0)
					actions.push({
						type: GROUP_REMOVE_COLLECTION,
						collectionId: collection._id
					})

				//Move to root collection
				if (!target.parentId){
					//make original also root
					if (collection.parentId)
						actions.push({
							type: COLLECTION_UPDATE_REQ,
							_id: _id,
							set: { parentId: 'root' }
						})

					actions.push({
						type: GROUP_APPEND_COLLECTION,
						_id: findGroupByCollection(state.collections.groups, target._id)._id,
						collectionId: _id,
						after: parseInt(after),
						before: parseInt(before),
						ignore: _id<=0 //useful to give ability dragging of blank collection (-101)
					})
				}
				//Make nested children and reorder
				else{
					if (collection.access.draggable === false)
						throw new ApiError({ status: 403, errorMessage: 'collection is not draggable' })
					
					let order = 0
					let siblings = 0
					
					//find target sibling to get exact sort position
					_.forEach(
						_.sortBy(state.collections.items, ({sort})=>sort),
						(item)=>{
							if (item.parentId == target.parentId && item._id != _id){
								if (item._id == target._id)
									order = siblings+(after?1:0)
								
								siblings++
							}
						}
					)

					//prevent for non-pro users
					if (collection.parentId != target.parentId)
						yield onlyForProUsersCheck()

					actions.push({
						type: COLLECTION_UPDATE_REQ,
						_id: collection._id,
						set: {
							parentId: parseInt(target.parentId),
							order
						}
					})
				}

				yield all(actions.map(action=>put(action)))
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