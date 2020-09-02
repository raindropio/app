import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import { Layout, Separator } from '~co/common/form'
import File from './file'
import Mode from './mode'
import Parcel from './parcel'
import Help from './help'

export default (props)=>(
	<Layout type='grid'>
		<Helmet><title>{t.s('importBookmarks')}</title></Helmet>

		<File />
		<Mode />
		<Parcel />

		<Separator />

		<Help />
	</Layout>
)