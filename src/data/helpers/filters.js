import Immutable from 'seamless-immutable'
import _ from 'lodash-es'

export const normalizeArray = (a=[])=>(
	Immutable(_.sortBy(_.map(_.filter(a, (item={})=>Object.keys(item).length), (item)=>({
		name: item._id,
		count: item.count
	})), ({name})=>name.toLowerCase()))
)

export const normalizeEntity = (entity={})=>entity.count||0

export const blankSpace = Immutable({
	status: 	'idle',
	tags: 		[],
	types: 		[],
})