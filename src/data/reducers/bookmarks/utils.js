import _ from 'lodash-es'
import { iterateSpaceId } from '../../helpers/bookmarks'

export const actualizeSpaceStatus = (state, spaceId)=>{
	iterateSpaceId(spaceId, (cleanSpaceId)=>{
		const space = state.getIn(['spaces', cleanSpaceId])
		var newMainStatus = '',
			newNextPageStatus = ''

		if (space && space.status){
			if ((space.status.main=='loaded')&&(space.ids.length==0)){
				newMainStatus = 'empty'
				newNextPageStatus = 'noMore'
			}
			else if ((space.status.main=='empty')&&(space.ids.length)){
				newMainStatus = 'loaded'
				newNextPageStatus = 'noMore'
			}
		}

		if (newMainStatus)
			state = state.setIn(['spaces', cleanSpaceId, 'status', 'main'], 		newMainStatus)

		if (newNextPageStatus)
			state = state.setIn(['spaces', cleanSpaceId, 'status', 'nextPage'], 	newNextPageStatus)
	})

	return state
}

export const insertIdToSpace = (state, spaceId, _id)=>{
	iterateSpaceId(spaceId, (cleanSpaceId)=>{
		const space = state.getIn(['spaces', cleanSpaceId])
		if (space && space.status)
			if (space.status.main=='loaded' || space.status.main=='empty'){
				state = state
					.setIn(['spaces', cleanSpaceId, 'ids'], _.uniq([_id].concat(space.ids||[])))
			}
	})

	return state
}

export const removeIdFromSpace = (state, spaceId, _id)=>{
	iterateSpaceId(spaceId, (cleanSpaceId)=>{
		const ids = state.getIn(['spaces', cleanSpaceId, 'ids'])||[]
		if (ids.length)
			state = state
				.setIn(['spaces', cleanSpaceId, 'ids'], ids.filter((id)=>id!=_id))
	})

	return state
}