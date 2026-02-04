import user from './user'
import backups from './backups'
import collections from './collections'
import bookmarks from './bookmarks'
import filters from './filters'
import tags from './tags'
import covers from './covers'
import config from './config'
import oauth from './oauth'
//import rate from './rate'
import _import from './import'

export default {
	user,
	backups,
	collections, //before bookmarks!
	bookmarks,
	filters,
	tags,
	covers,
	config,
	oauth,
	//rate,
	import: _import
}