const FILTER = /^(?:[A-Za-z]+:[A-Za-z]+|❤️)$/

export const getSpaceCacheId = (spaceId, search='')=>{
	const filter = String(search).trim()

	return String(spaceId) === '0' && FILTER.test(filter) ?
		`0:${filter}` :
		spaceId
}
