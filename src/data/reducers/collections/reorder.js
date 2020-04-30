import _ from 'lodash-es'
import {
	normalizeCollection
} from '../../helpers/collections'
import {
    COLLECTION_UPDATE_REQ,
} from '../../constants/collections'

export default function(state, action) {switch (action.type) {
    case COLLECTION_UPDATE_REQ:{
        //speed up drag reorder
        if (action.set){
            const { parentId, order=-1 } = action.set

            if (parentId || order!=-1){
                let collection = state.getIn(['items', action._id])

                if (parentId)
                    collection = collection.set('parentId', parentId)

                //reorder siblings
                if (order!=-1){
                    collection = collection.set('sort', order)

                    let i=0
                    _.forEach(
                        _.sortBy(state.items, ({sort})=>sort),
                        (item)=>{
                            if (item.parentId == collection.parentId &&
                                item._id != collection._id){
                                state = state.setIn(['items', item._id, 'sort'], i + (i>=order?1:0) )
                                i++
                            }
                        }
                    )
                }
                    
                return state.setIn(['items', action._id], normalizeCollection(collection))
            }
        }
    }break
}}