import { 
	SPACE_LOAD_REQ,
	SPACE_RELOAD_REQ,
	SPACE_REFRESH_REQ,
	SPACE_ACTUALIZE_REQ,
	SPACE_NEXTPAGE_REQ,
	SPACE_CHANGE_SORT,
	SPACE_CHANGE_VIEW_CONFIG
} from '../../constants/bookmarks'

//Loading
export const load = (spaceId, query={})=>({
	type: SPACE_LOAD_REQ,
	spaceId: String(spaceId),
	query
})

export const reload = (spaceId)=>({
	type: SPACE_RELOAD_REQ,
	spaceId: String(spaceId)
})

export const refresh = (spaceId)=>({
	type: SPACE_REFRESH_REQ,
	spaceId: String(spaceId)
})

export const actualize = (spaceId)=>({
	type: SPACE_ACTUALIZE_REQ,
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

export const changeItemHide = (spaceId, raindrops_hide)=>({
	type: SPACE_CHANGE_VIEW_CONFIG,
	spaceId: String(spaceId),
	raindrops_hide
})

export const changeGridSize = (spaceId, raindrops_grid_size)=>({
	type: SPACE_CHANGE_VIEW_CONFIG,
	spaceId: String(spaceId),
	raindrops_grid_size
})