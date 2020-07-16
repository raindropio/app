import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'
import {store} from '../../index.js'
import {
	bookmarksIds, query
} from './space'

const oneJanuary = new Date(new Date().getFullYear(),0,1)
const getFormatedDate = (date)=>{
	var obj
	switch(date){
		case 'yesterday': obj=new Date(); obj.setDate(new Date().getDate()-1); break;
		case undefined: obj=new Date(); break;
		default: obj=new Date(date); break;
	}

	return {
		ymd: `${obj.getFullYear()}-${obj.getMonth()}-${obj.getDate()}`,
		ym: `${obj.getFullYear()}-${obj.getMonth()}`,
		w: Math.ceil((((obj - oneJanuary) / 86400000) + oneJanuary.getDay()+1)/7),
		obj: obj
	}
}
const getHumanDate = (date)=>{
	const formatedDate = getFormatedDate(date)
	var value;

	if (formatedDate.ymd == todayDate.ymd)
		value = 'today'
	else if (formatedDate.ymd == yesterdayDate.ymd)
		value = 'yesterday'
	else if (formatedDate.w == todayDate.w)
		value = 'week'
	else
		value = formatedDate.obj

	return {value, formatedDate}
}

const
	emptyArray = Immutable([]),
	todayDate = getFormatedDate(),
	yesterdayDate = getFormatedDate('yesterday')

export const bookmarksWithSectionsEmpty = createSelector(
	[()=>[]],
	()=>emptyArray
)

var bookmarkSectionsCache = {}
export const bookmarkSection = (item, sort, collectionId)=>{
	if (bookmarkSectionsCache[item._id+sort])
		return bookmarkSectionsCache[item._id+sort]

	var section={
		type: '',
		title: '',
		value: ''
	}

	try{switch(sort){
		case 'domain':
		case '-domain':
			section.title = item.domain
			section.type = 'domain'
		break;

		case 'title':
		case '-title':
			section.title = (item.title||'').trim().toUpperCase().substr(0, 1)

			if (/\d/.test(section.title))
				section.title = '#'

			section.type = 'text'
		break;

		case 'sort':
			section.title = '-'
			section.type = 'text'
		break;

		case 'score':
			section.title = (collectionId == item.collectionId ? 'current' : 'other')
			section.type = 'score'
		break;

		default:{
			const {value, formatedDate} = getHumanDate(item.created || item.lastUpdate)
			section.title = formatedDate.ym

			if (typeof value == 'string')
				section.title = value
			else
				section.value = value

			section.type = 'date'
		}
	}}catch(e){console.log(e)}

	bookmarkSectionsCache[item._id+sort] = section
	return section
}

export const makeBookmarksWithSections = ()=> createSelector(
	[bookmarksIds, (state,spaceId)=>spaceId, (state, spaceId)=>{
		const space = state.bookmarks.spaces[spaceId]
		if (space)
			if (space.query)
				if (space.query.sort)
					return space.query.sort

		return ''
	}],
	(ids, spaceId, sort)=>{
		if (!ids.length)
			return emptyArray

		let elements = []
		try{elements = store.getState().bookmarks.elements}catch(e){}

		var sections = [], 
			lastSection = 0
		const collectionId = parseInt(spaceId)

		ids.forEach((_id)=>{
			const item = elements[_id]
			if (!item) return;

			const itemSection = bookmarkSection(item, sort, collectionId)

			if (itemSection.title != lastSection){
				lastSection = itemSection.title
				sections.push({
					title: itemSection.title,
					type: itemSection.type,
					value: itemSection.value||itemSection.title,
					data: []
				})
			}

			sections[sections.length-1].data.push(_id)
		})

		return Immutable(sections)
	}
)

export const makeBookmarksWithSectionsBlocked = () => createSelector(
	[makeBookmarksWithSections()],
	(sections)=>{
		if (sections.length)
			sections.forEach((section, index)=>{
				sections = sections.setIn([index, 'data'], [section.data])
			})

		return sections
	}
)