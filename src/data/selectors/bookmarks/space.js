import { createSelector } from 'reselect'
import _ from 'lodash-es'
import {
	blankSpace
} from '../../helpers/bookmarks'

const
	_spaceById = ({bookmarks}, spaceId)=>bookmarks.spaces[spaceId]

//Space by collection id
export const bookmarksIds = createSelector(
	[_spaceById],
	(space={})=>space.ids||blankSpace.ids
)

export const makeBookmarksIds = ()=>createSelector(
	[_spaceById],
	(space={})=>space.ids||blankSpace.ids
)

export const makeBookmarksCount = ()=>createSelector(
	[bookmarksIds],
	(ids)=>ids.length
)

export const makeStatus = () => createSelector(
	[_spaceById],
	(space={})=>(space.status||blankSpace.status)
)

export const makeStatusMain = () => createSelector(
	[_spaceById],
	(space={})=>(space.status||blankSpace.status).main
)

export const makeStatusNextPage = () => createSelector(
	[_spaceById],
	(space={})=>(space.status||blankSpace.status).nextPage
)

export const makeBookmarksLastChange = () => createSelector(
	[({bookmarks={}})=>bookmarks.elements],
	()=>new Date().getTime()
)


//Query
export const query = createSelector(
	[_spaceById],
	(space={})=>space.query||blankSpace.query
)

export const makeSort = ()=>createSelector(
	[_spaceById],
	(space={})=>(space.query||blankSpace.query).sort
)


//Sorts
export const makeSorts = ()=>createSelector(
	[_spaceById],
	(space={})=>space.sorts||blankSpace.sorts
)


//Search
export const getSearch = (state, spaceId)=>{
	const space = _spaceById(state, spaceId)
	return space && space.query && space.query.search || blankSpace.query.search
}

export const getSearchEmpty = (state, spaceId)=>
	getSearch(state, spaceId).length==0

export const makeSearchWord = ()=> createSelector(
	[getSearch],
	(search=[])=>{
		return (_.find(search, ({key})=>key=='word')||{val:''}).val
	}
)