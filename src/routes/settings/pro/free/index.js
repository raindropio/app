import s from './index.module.styl'
import React from 'react'
import config from '~config'

import SuperFrame from '~co/common/superFrame'

export default ()=>{
	return (
		<SuperFrame
			className={s.free}
			src={`${config.links.pro.compare}&frame=1`} />
	)
}