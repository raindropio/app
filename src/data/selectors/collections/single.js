import { createSelector } from 'reselect'
import { getCollection, getPath, blankCollection } from '../../helpers/collections'

//Single, super fast, unsafe
export const collection = (state, _id) => state.collections.items[_id] ? state.collections.items[_id] : blankCollection

//More safe, slower
export const makeCollection = ()=> createSelector(
	[
        ({collections={}}, collectionId)=>collections.items[parseInt(collectionId)],
        (state,_id)=>_id
    ],
	getCollection
)

//Path
export const makeCollectionPath = ()=>createSelector(
	[
        ({collections={}})=>collections.items,
        ({collections={}})=>collections.groups,
        (state, objectId)=>objectId,
        (state,collectionId,options)=>options
    ],
	getPath
)

//
export const getBlankId = (state) =>
    state.collections.items[-101] ? -101 : undefined