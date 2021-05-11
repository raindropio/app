import { createSelector } from 'reselect'
import _ from 'lodash-es'
import { blankSpace } from '../../helpers/bookmarks'
import { makeCollection } from '../collections'

//Space by collection id
export const bookmarksIds = ({bookmarks}, spaceId)=>
	bookmarks.spaces[spaceId] ? bookmarks.spaces[spaceId].ids : blankSpace.ids

export const makeBookmarksIds = ()=>bookmarksIds

export const makeBookmarksCount = ()=>createSelector(
	[bookmarksIds],
	(ids)=>ids.length
)

//Space itself
export const status = ({bookmarks}, spaceId)=>
	bookmarks.spaces[spaceId] ? bookmarks.spaces[spaceId].status : blankSpace.status

export const makeStatus = () => status

export const makeBookmarksLastChange = () => createSelector(
	[({bookmarks={}})=>bookmarks.elements],
	()=>new Date().getTime()
)


//Query
export const query = ({bookmarks}, spaceId)=>
	bookmarks.spaces[spaceId] ? bookmarks.spaces[spaceId].query : blankSpace.query

export const makeSort = ()=> (state, spaceId)=>
	query(state, spaceId).sort


//Sorts
export const makeSorts = ()=>({bookmarks}, spaceId)=>
	bookmarks.spaces[spaceId] ? bookmarks.spaces[spaceId].sorts : blankSpace.sorts


//Search
export const getSearch = (state, spaceId)=>
	query(state, spaceId).search

export const getSearchEmpty = (state, spaceId)=>
	getSearch(state, spaceId).length==0

export const makeSearchWord = ()=> createSelector(
	[getSearch],
	(search=[])=>{
		return (_.find(search, ({key})=>key=='word')||{val:''}).val
	}
)


//View specific
export const getCoverSize = (state, view)=>{
	switch(view) {
		case 'grid':
		case 'masonry':
			return state.config.raindrops_grid_cover_size

		default:
			return state.config.raindrops_list_cover_size
	}
}

export const makeViewHide = ()=> createSelector(
	[state=>state.config.raindrops_hide, makeCollection()],
	(hide=[], { view })=>(
		hide
			.filter(key=>key.startsWith(view+'_'))
			.map(key=>key.replace(`${view}_`, ''))
	)
)


//Space elements
export const makeSpaceElements = ()=> createSelector(
	[
		state => state.bookmarks.elements,
		bookmarksIds
	],
	(elements, ids)=>{
		return _.pick(elements, ids)
	}
)