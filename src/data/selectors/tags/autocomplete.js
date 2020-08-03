import { createSelector } from 'reselect'
import _ from 'lodash'
import { getTags } from './items'

const emptyArray = []

function filterSelected(tags=[], selected=[]) {
	if (!selected) return tags
	return tags.filter(item =>
		!selected.includes(item._id) && 
		!selected.includes(item.query)
	)
}

function filterOther(tags=[], other=[]) {
	if (!other.length) return tags
	return tags.filter(item =>
		!other.some(({ _id }) => _id == item._id)
	)
}

function filterByQuery(tags=[], query='') {
	if (!query) return tags
	return tags.filter(item => 
		item._id.toLowerCase().startsWith(query)
	)
}

//(state, spaceId, filter, selected=[])
export const makeTagsAutocomplete = ()=>createSelector(
	[
		(state)=>getTags(state, '0s'),
		(state, spaceId)=>parseInt(spaceId) ? getTags(state, spaceId) : emptyArray,
		(state)=>state.tags.recent,
		(state, spaceId, filter)=>filter,
		(state, spaceId, filter, selected)=>selected||emptyArray
	],
	(_other, _collection, _recent, _filter, selected)=>{
		const filter = (_filter||'').trim().toLowerCase().replace(/^#/,'')

		//tags
		let recent 		= filterByQuery(filterSelected(_recent, selected), filter)
		let collection 	= filterByQuery(filterOther(filterSelected(_collection, selected), recent), filter)
		let other 		= filterByQuery(filterOther(filterSelected(_other, selected), [...recent, ...collection]), filter)

		let sections = []

		if (recent.length)
			sections.push(
				{ type: 'section', _id: 'recent' },
				...recent
			)

		if (collection.length)
			sections.push(
				{ type: 'section', _id: 'collection' },
				...collection
			)

		if (sections.length)
			sections.push(
				{ type: 'section', _id: 'other' }
			)

		return [
			...sections,
			...other
		]
	}
)