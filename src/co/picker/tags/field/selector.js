import { createSelector } from 'reselect'
import { getFilters } from '~data/selectors/filters'

const emptyArray = []

/*
    (state, { collectionId, selected=[] }, filter) ->
    [ { group, items: [ {_id, count, index} ] } ]
*/
export default ()=>createSelector(
	[
        //global
        state=>
            getFilters(state, 0).tags,

        //from collection
        (state, { collectionId })=>
            collectionId ? getFilters(state, collectionId).tags : emptyArray,

        //selected
        (state, { selected=emptyArray })=>
            selected,

        //filter query
        (state, props, filter)=>
            filter ? filter : ''
    ],
    (global, collection, selected, _filter)=>{
        const filter = _filter.toLowerCase().replace(/^#/,'')
        let groups = [];
        let index = -1;

        [
            ['collection', collection],
            ['all', global, true]
        ].forEach(([ group, dirty, globals=false ])=>{
            if (!dirty.length) return

            const items = dirty
                .filter(item => {
                    if (!globals && global.some(({_id})=>_id == item._id)) return false
                    if (selected.includes(item._id)) return false
                    if (filter) return item._id.toLowerCase().includes(filter)
                    return true
                })
                .map(item => {
                    index++
                    return { ...item, index }
                })
                
            if (!items.length) return

            groups.push({
                group,
                items
            })
        })

        return groups
    }
)