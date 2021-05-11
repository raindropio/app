import { 
	SPACE_LOAD_PRE,
	SPACE_REFRESH_REQ,
	SPACE_NEXTPAGE_REQ,
	SPACE_CHANGE_SORT,
	SPACE_VIEW_TOGGLE,
	SPACE_VIEW_CONFIG
} from '../../constants/bookmarks'

//Loading
export const load = (spaceId, query={})=>({
	type: SPACE_LOAD_PRE,
	spaceId: String(spaceId),
	query
})

export const refresh = (spaceId)=>({
	type: SPACE_REFRESH_REQ,
	spaceId: String(spaceId)
})

export const nextPage = (spaceId)=>({
	type: SPACE_NEXTPAGE_REQ,
	spaceId: String(spaceId)
})

export const changeSort = (spaceId, sort)=>({
	type: SPACE_CHANGE_SORT,
	spaceId: String(spaceId),
	sort
})

export const viewToggle = (spaceId, field)=>({
	type: SPACE_VIEW_TOGGLE,
	spaceId: String(spaceId),
	field
})

export const changeCoverSize = (spaceId, view, value)=>{
	switch(view) {
		case 'grid':
		case 'masonry':
			return {
				type: SPACE_VIEW_CONFIG,
				spaceId: String(spaceId),
				raindrops_grid_cover_size: parseInt(value)
			}

		default:
			return {
				type: SPACE_VIEW_CONFIG,
				spaceId: String(spaceId),
				raindrops_list_cover_size: parseInt(value)
			}
	}
}

export const setListCoverRight = (spaceId, raindrops_list_cover_right)=>({
	type: SPACE_VIEW_CONFIG,
	spaceId: String(spaceId),
	raindrops_list_cover_right
})