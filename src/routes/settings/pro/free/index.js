import s from './index.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'
import { target, environment } from '~target'

import SuperFrame from '~co/common/superFrame'
import { Layout } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default ()=>{
	if (target == 'extension' && environment.includes('safari'))
		return (
			<Layout>
				<Button 
					href={config.links.pro.frame}
					target='_blank'
					variant='primary'
					data-block>
					<Icon name='open' size='micro' />
					{t.s('upgradeToPro')}
				</Button>
			</Layout>
		)

	return (
		<SuperFrame
			className={s.free}
			src={config.links.pro.frame} />
	)
}