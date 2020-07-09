import { createSelector } from 'reselect'
import { getTags } from './items'

const emptyArray = []

//(state, spaceId, filter, selected=[])
export const makeTagsAutocomplete = ()=>createSelector(
	[
		(state)=>getTags(state, '0s'),
		(state, spaceId)=>parseInt(spaceId) ? getTags(state, spaceId) : emptyArray,
		(state, spaceId, filter)=>filter,
		(state, spaceId, filter, selected)=>selected||emptyArray
	],
	(global, collection, _filter, selected)=>{
		const filter = (_filter||'').trim().toLowerCase().replace(/^#/,'')

		return [
			...collection.filter(({ _id }) => !global.some(tag=>tag._id == _id) ),
			...global
		].filter(item => {
			if (selected.includes(item._id)) return false
			if (selected.includes(item.query)) return false
			if (filter) return item._id.toLowerCase().includes(filter)
			return true
		})
	}
)