import { blankSpace } from '../../helpers/tags'

//(state, spaceId)
export const getTags = ({ tags }, spaceId)=>
	(
		tags.spaces[spaceId] ? tags.spaces[spaceId] : blankSpace
	).tags