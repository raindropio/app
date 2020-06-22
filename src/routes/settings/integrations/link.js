import React from 'react'
import Icon from '~co/common/icon'
import t from '~t'

export default ({title, subtitle, href, icon, color})=>{
	return (
		<div>
			<Icon name={icon} data-size="60" style={{ color }} />
            <h1 className="extraHeadLabel">{title}</h1>
			<p className="subHeadLabel">{subtitle}</p>

			<br/>
			<a className="button blue standart" href={href} target="_blank"><b>{t.s("open")}</b></a>
		</div>
	)
}