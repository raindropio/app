import { all } from 'redux-saga/effects'
import items from './items'
import single from './single'

export default function* () {
	yield all([
		items(),
		single()
	])
}