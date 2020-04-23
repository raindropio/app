import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import Sidebar from './sidebar'
import LayoutWrap from '../co/columns/layoutWrap'

class Layout extends React.Component {
	displayName = "install/index"

	render() {
		return (
			<div>
				<Helmet><title>{t.s("install")}</title></Helmet>

				<Sidebar />
				{this.props.children}
			</div>
		);
	}
}

export default LayoutWrap(Layout)