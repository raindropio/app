import { createSelector } from 'reselect'
import _ from 'lodash-es'

export const makeGroupped = ()=> createSelector(
	[state=>state.predictions.items],
	(items)=>{
        return Object.entries(_.groupBy(items, 'kind'))
    }
)