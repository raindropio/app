import Immutable from 'seamless-immutable'
import _ from 'lodash-es'

export const normalizeObjects = (a=[])=>(
	Immutable(_.sortBy(_.map(_.filter(a, (item={})=>Object.keys(item).length), (item)=>({
		name: item._id,
		count: item.count
	})), ({name=''})=>name.toLowerCase()))
)

export const normalizeArray = (a=[])=>(
	Immutable(_.uniq(a.map((v)=>v.toLowerCase())).sort().map((name)=>({
		name: name,
		count: 0
	})))
)

export const blankItems = Immutable([])