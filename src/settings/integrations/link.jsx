import React from 'react'
import Icon from 'icon'
import t from 't'

export default ({title, subtitle, href, icon, color})=>{
	return (
		<div>
			<Icon name={icon} className="svgIcon-size-60" style={{ color }} />
            <h1 className="extraHeadLabel">{title}</h1>
			<p className="subHeadLabel">{subtitle}</p>

			<br/>
			<a className="button blue standart" href={href} target="_blank"><b>{t.s("open")}</b></a>
		</div>
	)
}