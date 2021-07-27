import { all } from 'redux-saga/effects'
import items from './items'
import single from './single'
import recent from './recent'

export default function* () {
	yield all([
		items(),
		single(),
		recent()
	])
}