import React from 'react'
import { target } from '~target'

let Component = target == 'extension' ? 
	require('./extension').default :
	require('./fallback').default

export default class BookmarksAddWrap extends React.PureComponent {
	static defaultProps = {
		spaceId: 0,
		onEdit: undefined //func(item)
	}

	render() {
		return (
			<Component {...this.props} />
		)
	}
}