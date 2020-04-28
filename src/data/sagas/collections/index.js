import { all } from 'redux-saga/effects'
import items from './items'
import groups from './groups'
import single from './single'
import drafts from './drafts'
import sharing from './sharing'

export default function* () {
	yield all([
		items(),
		groups(),
		single(),
		drafts(),
		sharing()
	])
}