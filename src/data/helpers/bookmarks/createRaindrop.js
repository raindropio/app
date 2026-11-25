import Api from '../../modules/api'

export async function createRaindrop(obj={}) {
	let item = { ...obj }

	//minimum info is already provided, grab all other in background on server
	if (item.title)
		item.pleaseParse = { weight: 1 }
	//parse bookmark otherwise
	else {
		const parsed = await Api._get('import/url/parse?url='+encodeURIComponent(item.link))
		item = { ...item, ...parsed.item }
	}

	//try to create bookmark on server
	let res
	try {
		res = await Api._post('raindrop', item)
	} catch (e) {}

	//try again, maybe it's collectionId related issue
	if (!res)
		res = await Api._post('raindrop', {...item, collectionId: -1 })

	return res.item
}
