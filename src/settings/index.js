import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import Sidebar from './sidebar'
import LayoutWrap from '../co/columns/layoutWrap'

class Layout extends React.Component {
	displayName = "settings/index"

	render() {
		return (
			<div>
				<Helmet><title>{t.s("settings")}</title></Helmet>

				<Sidebar />
				{this.props.children}
			</div>
		);
	}
}

export default LayoutWrap(Layout)