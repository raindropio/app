import { createSelector } from 'reselect'
import _ from 'lodash'
import { getTags } from './items'

const emptyArray = []

function filterSelected(tags=[], selected=[]) {
	if (!selected.length) return tags
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

	const filter = query.toLowerCase()

	//filter and order by score
	return _.orderBy(
		_.uniqBy(
			[
				...tags.filter(item => 
					item._id.toLowerCase().includes(filter)
				),
				{
					_id: query,
					query: `#${query}`,
					isNew: true
				}
			],
			'_id'
		),
		({ _id, isNew }) => isNew || _id.toLowerCase().indexOf(filter)+_id.toLowerCase(),
		'asc'
	)
}

//(state, spaceId, filter, selected=[])
export const makeTagsAutocomplete = ()=>createSelector(
	[
		(state)=>getTags(state, 'global'),
		(state, spaceId)=>parseInt(spaceId) ? getTags(state, spaceId) : emptyArray,
		(state)=>state.tags.recent,
		(state, spaceId, filter)=>filter,
		(state, spaceId, filter, selected)=>selected||emptyArray
	],
	(_other, _collection, _recent, _filter, selected)=>{
		const filter = String(_filter||'').trimStart().replace(/^#/,'')

		//filter
		if (filter)
			return filterByQuery(filterSelected([..._collection,..._other], selected), filter)

		//tags
		let recent 		= filterSelected(_recent, selected)
		let collection 	= filterOther(filterSelected(_collection, selected), recent)
		let other 		= filterOther(filterSelected(_other, selected), [...recent, ...collection])

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

		if (sections.length && other.length)
			sections.push(
				{ type: 'section', _id: 'other' }
			)

		return [
			...sections,
			...other
		]
	}
)