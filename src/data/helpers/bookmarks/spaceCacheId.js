const FILTER = /^(-?[\w.]+:[^\s"']+|❤️)$/

export const getSpaceCacheId = (spaceId, search='')=>{
	const filter = String(search).trim()

	return String(spaceId) === '0' && FILTER.test(filter) ?
		`0:${filter}` :
		spaceId
}
