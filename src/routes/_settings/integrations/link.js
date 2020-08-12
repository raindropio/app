import React from 'react'
import Icon from '~co/common/icon'
import t from '~t'

import Button from '~co/common/button'

export default ({title, subtitle, href, icon, color})=>{
	return (
		<div>
			<Icon name={icon} enlarge='3' style={{ color }} />
            <h1 className='extraHeadLabel'>{title}</h1>
			<p className='subHeadLabel'>{subtitle}</p>

			<br/>
			<Button variant='outline' href={href} target='_blank'>{t.s('open')}</Button>
		</div>
	)
}