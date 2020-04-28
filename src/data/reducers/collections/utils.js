import _ from 'lodash-es'

export const actualizeStatus = (state)=>{
	var collectionsFulfiled = _.some(state.items, ({count}, _id)=>{
		if (_id>0) return true
		if (_id<=0 && count) return true
	})

	if (state.status=='loaded' && !collectionsFulfiled)
		return state.set('status', 'empty')
	else if (state.status=='empty' && collectionsFulfiled)
		return state.set('status', 'loaded')

	return state
}

export const updateCollections = (state, clean)=>{
	_.forEach(clean, (part, partName)=>{
		if (!_.isEqual(state[partName], part)){
			state = state.set(partName, part)
		}
	})

	return state
}

export const modifyItem = (state, _id, func)=>{
	if (state.status!='loaded')
		return state

	if (state.items[_id])
		state = state.setIn(['items', _id], func(state.items[_id]))

	return state
}

export const increaseCount = (state, _id)=>(
	modifyItem(state, _id, (item)=>item.set('count', item.count+1))
)

export const decreaseCount = (state, _id)=>(
	modifyItem(state, _id, (item)=>item.set('count', item.count-1))
)

export const removeCollectionFromGroups = (state, collectionId)=>{
	_.forEach(state.groups, ({collections=[]}, index)=>{
		state = state.setIn(['groups', index, 'collections'], collections.filter((_id)=>_id!=collectionId))
	})
	return state
}