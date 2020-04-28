import { COVERS_LOAD_REQ } from '../constants/covers'

export const load = (query='')=>({
	type: COVERS_LOAD_REQ,
	query
})