import React from 'react'
import t from 't'
import DocumentTitle from 'react-document-title'

import Sidebar from './sidebar'
import LayoutWrap from '../co/columns/layoutWrap'

class Layout extends React.Component {
	displayName = "install/index"

	render() {
		return (
			<div>
				<DocumentTitle title={t.s("install")} />
				<Sidebar />
				{this.props.children}
			</div>
		);
	}
}

export default LayoutWrap(Layout)