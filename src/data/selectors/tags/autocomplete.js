import { createSelector } from 'reselect'
import _ from 'lodash'
import { getTags } from './items'

const emptyArray = []

function filterSelected(tags, selected) {
	return tags.filter(item => {
		for(const tag of selected)
			if (tag == item._id || tag == item.query)
				return false

		return true
	})
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
	(global, collection, _recent, _filter, selected)=>{
		const filter = (_filter||'').trim().toLowerCase().replace(/^#/,'')

		//recent tags
		let recent = filterSelected(_recent, selected)

		//main tags
		let tags = filterSelected([
			...collection.filter(({ _id }) => !global.some(tag=>tag._id == _id) ),
			...global
		], selected)

		//remove recent from main list of tags
		if (recent.length)
			tags = tags.filter(({ _id })=> !recent.some(tag=>tag._id==_id))

		//filter
		if (filter)
			return _.orderBy(
				[...recent, ...tags].filter(item =>
					item._id.toLowerCase().startsWith(filter)
				),
				(x)=>_.includes(x, filter),
				'desc'
			)
		//recent
		else if (recent.length)
			return [
				{ type: 'section', _id: 'recent' },
				...recent,
				{ type: 'section', _id: 'other' },
				...tags
			]

		return tags
	}
)