import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import { Layout } from '~co/common/form'
import { Header } from '~co/screen/splitview/main'
import { Title } from '~co/common/header'

import Automatic from './automatic'
import Add from './add'
import Files from './files'
import Cloud from './cloud'

export default (props)=>(
	<>
		<Helmet><title>{t.s('backups')}</title></Helmet>
		<Header data-fancy><Title>{t.s('backups')}</Title></Header>

		<Layout type='grid'>
			<Automatic {...props} />

			<div className={s.list}>
				<Add {...props} />
				<Files {...props} />
			</div>

			<Cloud {...props} />
		</Layout>
	</>
)