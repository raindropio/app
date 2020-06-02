import { createSelector } from 'reselect'

export const selectMode = ({collections})=>
    collections.selectMode

export const selectModeEnabled = ({collections}) => collections.selectMode.enabled

export const makeIsSelected = ()=>createSelector(
	[selectMode, (state, _id)=>_id],
	(selectMode, _id)=>{
		if (!selectMode.enabled)
			return false;

		if (selectMode.ids.includes(_id))
			return true;

		return false;
	}
)