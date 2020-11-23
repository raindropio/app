import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'
import _ from 'lodash-es'
import { normalizeCollection, getChildrens } from '../../helpers/collections'

//Defaults
const
	emptyObject = {},
	emptyArray = [],
	_collectionsItems = ({collections={}})=>collections.items,
	_collectionsGroups = ({collections={}})=>collections.groups,
	_collectionsStatus = ({collections={}})=>collections.status

//Items
export const makeFiltered = ()=> createSelector(
	[_collectionsItems, (state, _search)=>_search, (state, _search, ignore)=>ignore],
	(items, _search, ignore)=>{
		const search = (_search||'').toLowerCase().trim()
		if (!search) return emptyArray

		const found = []

		_.forEach(items, item=>{
			if ((item.title||'').toLowerCase().includes(search) &&
				item._id != ignore)
				found.push(item)
		})

		return found.length ? found : emptyArray
	}
)

//Tree
const makeGroupTree = (groupIds, items=[], sortedItems)=>{
	var results = []

	groupIds.forEach((_id)=>{
		const item = items[_id]
		if (item && !item.parentId)
			results.push(...getChildrens(sortedItems, item))
	})

	//Find expandable items
	var parentIds = {}
	sortedItems.forEach(({parentId})=>{
		if (parentId) parentIds[parentId]=true
	})

	for(var i in results)
		if (results[i].item._id>0)
			results[i].expandable = (parentIds[results[i].item._id] ? true : false)

	return results
}

export const makeTree = ()=> createSelector(
	[_collectionsItems, _collectionsGroups, (state,props={})=>props.options||emptyObject],
	(items, groups, options)=>{
		if (_.isEmpty(items) && _.isEmpty(groups))
			return emptyArray

		//Options
		const {
			hideIds=[],
			showGroups,
			showCreateNew=true
		} = options
		const search = options.search ? (options.search||'').trim().toLowerCase() : ''

		const filterIds = (_id)=>(
			!hideIds.length ||
			!hideIds.includes(typeof _id == 'object' ? _id.item._id : _id)
		)

		const sortedItems = _.sortBy(items, ({sort})=>sort)

		var sections = []
		
		if (!search) {
			sections = [{
				_id: 'g-1',
				title: 'default',
				data: makeGroupTree([0, -1, -99].filter(filterIds), items, sortedItems),
				system: true
			}]
	
			groups.forEach((group)=>{
				var hidden = group.hidden
				if (showGroups)
					hidden = false
	
				sections.push({
					_id: group._id,
					title: group.title,
					data: hidden ? [] : makeGroupTree(group.collections, items, sortedItems).filter(filterIds),
					hidden: hidden,
					sort: group.sort
				})
			})
		}else{
			const filtered = _.filter(items, ({_id, title})=>
				_id>0 && title.toLowerCase().includes(search)
			)

			if (showCreateNew)
				filtered.unshift(normalizeCollection({
					_id: -100,
					title: options.search
				}))

			sections = [{
				_id: 'g-999',
				title: 'default',
				data: _.sortBy(filtered, ({title})=>title).map(item=>({item, level:0})),
				system: true
			}]
		}

		return Immutable(sections)
	}
)

export const makeTreeFlat = ()=> createSelector(
	[makeTree()],
	(groups)=>{
		const flat = []
		groups.forEach((g,i)=>{
			if (!g.system || i>0)
				flat.push({...g, type: 'group', data: undefined})

			//items
			g.data.forEach((c)=>{
				//hide trash when it empty
				if (g.system && c.item._id==-99 && !c.item.count) return

				flat.push({...c, type: 'collection'})
			})
		})
		return flat
	}
)

//Status
export const makeCollectionsStatus = ()=> createSelector(
	[_collectionsStatus],
	(status)=>status
)

//Collection itself and all childrens
export const makeBranchIds = () => createSelector(
	[_collectionsItems, (state, cid)=>cid],
	(items, cid)=>{
		const item = items[cid]

		if (!items[cid] || items[cid]._id <= 0)
			return [cid]

		return getChildrens(_.sortBy(items, ({sort})=>sort), item, 0, true)
			.map(({item})=>item._id)
	}
)