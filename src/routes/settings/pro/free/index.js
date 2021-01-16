import s from './index.module.styl'
import React from 'react'
import config from '~config'
import { target, environment } from '~target'

import { Layout } from '~co/common/form'
import Alert from '~co/common/alert'
import SuperFrame from '~co/common/superFrame'

export default ()=>{
	if (target == 'extension' && environment.includes('safari'))
		return (
			<Layout>
				<Alert variant='warning'>
					Subscriptions are not available
				</Alert>
			</Layout>
		)

	return (
		<SuperFrame
			className={s.free}
			src={`${config.links.pro.compare}?frame=1`} />
	)
}