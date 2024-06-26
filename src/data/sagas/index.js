import { all, spawn, delay, call } from 'redux-saga/effects'
import ApiError from '../modules/error'

import common from './common'
import user from './user'
import backups from './backups'
import collections from './collections'
import bookmarks from './bookmarks'
import filters from './filters'
import tags from './tags'
import covers from './covers'
import config from './config'
import oauth from './oauth'
import predictions from './predictions'
import _import from './import'

//saga will be restart on case of failure, error intself will be send to sentry
function* failSafe(saga) {
	return yield spawn(function* () {
		while (true) {
			try {
				yield call(saga)
				break
			} catch (e) {
				if (process.env.NODE_ENV!='production')
					console.error('saga fail', e)
			
				if (typeof e != 'object' ||
					e instanceof ApiError == false)
					if (RAINDROP_ENVIRONMENT != 'browser' || process.env.SENTRY_RELEASE) {
						require('@sentry/minimal').captureException(e)
					}

				yield delay(1000)
			}
		}
	})
}

const root = function* () {
	yield all([
		user,
		config,
		backups,
		collections,
		bookmarks,
		filters,
		tags,
		covers,
		oauth,
		predictions,
		_import,

		common
	].map(failSafe))
}

export default root