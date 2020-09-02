import user from './user'
import collections from './collections'
import bookmarks from './bookmarks'
import filters from './filters'
import tags from './tags'
import covers from './covers'
import config from './config'
import oauth from './oauth'
import _import from './import'

export default {
	user,
	collections, //before bookmarks!
	bookmarks,
	filters,
	tags,
	covers,
	config,
	oauth,
	import: _import
}