import s from './index.module.styl'
import React, { useEffect } from 'react'
import config from '~config'
import { target, environment } from '~target'

import SuperFrame from '~co/common/superFrame'

export default ()=>{
	useEffect(()=>{
		if (target == 'extension' &&
			environment.includes('safari')){
			window.open(config.links.pro.buy)
			window.close()
		}
	}, [])

	return (
		<SuperFrame
			className={s.free}
			src={config.links.pro.frame} />
	)
}