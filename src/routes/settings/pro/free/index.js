import s from './index.module.styl'
import React from 'react'
import config from '~config'

import SuperFrame from '~co/common/superFrame'

export default ()=>(
	<SuperFrame
		className={s.free}
		disableProxy={true}
		disableSandbox={true}
		src={`${config.links.pro.compare}?frame=1`}
		domain='raindrop.io' />
)