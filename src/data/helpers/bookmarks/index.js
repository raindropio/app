import Immutable from 'seamless-immutable'
import _ from 'lodash-es'

const emptyArray = []
const emptyObject = {}

export * from './blankSpace'
export * from './getSpaceQuery'

//Iterator by spaceId prefixes and original
export const iterateSpaceId = (spaceId, func)=>{
	const cleanSpaceId = String(parseInt(spaceId))
	func(cleanSpaceId)
	func(cleanSpaceId+'s')
}

//Saga helpers
export const getBookmark = ({elements, drafts}, _id)=>{
	var item = elements[_id]

	if (!item)
		item = getDraft(drafts, _id)

	return item || normalizeBookmark({_id: parseInt(_id)})
}

export const getMeta = ({meta, drafts}, _id)=>{
	var result = meta[_id]

	if (!result)
		result = getDraft(drafts, _id)

	return result||blankMeta
}

export const getBookmarkScreenshotIndex = ({meta, drafts}, _id)=>{
	var itemMeta = meta[_id]

	if (!itemMeta)
		itemMeta = getDraft(drafts, _id)

	if (itemMeta)
		return _.findIndex(itemMeta.media, (m)=>m.screenshot)

	return -1
}

export const getDraft = (drafts, _id)=>{
	const draft = drafts.byId[_id] || {}

	switch(draft.status){
		case 'loaded':
		case 'removed':{
			return draft.item
		}

		default:
			return undefined
	}
}

//Selector helpers
export const shouldLoadSpace = ({spaces={}}, spaceId)=>{
	if (typeof spaces[spaceId] == 'undefined' || !spaces[spaceId].status)
		return true

	switch(spaces[spaceId].status.main){
		case 'loading':
			return false
	}

	return true;
}

export const shouldLoadMoreSpace = ({spaces={}}, spaceId)=>{
	if (!shouldLoadSpace(spaces, spaceId))
		return false

	if (typeof spaces[spaceId] == 'undefined')
		return false

	switch(spaces[spaceId].status.main){
		case 'idle':
		case 'empty':
		case 'error':
			return false
	}

	switch(spaces[spaceId].status.nextPage){
		case 'loading':
		case 'noMore':
			return false
	}

	return true
}

export const normalizeBookmark = (item={}, options)=>{
	if (Immutable.isImmutable(item))
		return item

	options = options||{flat:true}

	var clean = {
		_id: 			parseInt(item._id||0),
		title: 			item.title||'',
		excerpt: 		item.excerpt||'',
		cover: 			item.cover,
		coverId: 		parseInt(item.coverId||0),
		domain: 		item.domain||'',
		collectionId: 	parseInt(item.collectionId||(item.collection ? item.collection.$id : 0)||0),
		link: 			item.link||'',
		type:  			item.type || 'link',
		created:		item.created || null,
		lastUpdate: 	item.lastUpdate || null,
		important: 		(item.important ? true : false),
		broken: 		(item.broken ? true : false),
		tags: 			(item.tags||[]).join(', '),
		reparse:		item.reparse || (item.pleaseParse ? true : false),
		cache:			item.cache ? item.cache.status : '',

		new: 			item.new ? true : false
	}

	if (!options.flat)
		clean = Object.assign({}, clean, normalizeMeta(item))

	return Immutable(clean)
}

export const normalizeBookmarks = (items=[], options)=>{
	var clean = [],
		meta = [],
		ids = []

	_.forEach(items, (item)=>{
		clean.push(normalizeBookmark(item,options))
		meta.push(normalizeMeta(item))
		ids.push(item._id)
	})

	return Immutable({
		elements: _.zipObject(
			ids,
			clean
		),
		meta: _.zipObject(
			ids,
			meta
		),
		ids: ids
	})
}

export const normalizeMeta = (item={})=>{
	return Immutable({
		tags: 		item.tags||emptyArray,
		media: 		item.media||emptyArray,
		highlight:	item.highlight||emptyObject
	})
}

export const blankSelectMode = Immutable({
	enabled: false,
	spaceId: null,
	all: false,
	ids: emptyArray,
	working: ''
})



export const blankDraft = Immutable({
	status: 'idle', //idle/loading/loaded/removed/error/saving/errorSaving
	item: emptyObject,
	changedFields: emptyArray
})

export const blankMeta = normalizeMeta()

export const blankBookmark = normalizeBookmark()

export const blankHtml = Immutable({
	status: 'idle', //idle/loading/loaded/error
	html: ''
})