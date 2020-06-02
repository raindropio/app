import { createSelector } from 'reselect'
import { getGroup } from '../../helpers/collections'

export const group = createSelector(
	[({collections={}})=>collections.groups, (state,_id)=>_id],
	getGroup
)