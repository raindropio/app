import { all } from 'redux-saga/effects'
import draft from './draft'
import single from './single'
import space from './space'
import selectMode from './selectMode'
import html from './html'
import recent from './recent'
import highlights from './highlights'

export default function* () {
	yield all([
		space(),
		single(),
		draft(),
		selectMode(),
		html(),
		recent(),
		highlights()
	])
}