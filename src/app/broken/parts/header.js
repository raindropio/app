import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'
import Icon from '~icon'

export default ({children, sidebarToggle, className})=>{
	const title = t.s("broken")+" "+t.s('links').toLowerCase()
	return (
		<header className={className}>
			<div className="headerWrap">
				<Helmet><title>{title}</title></Helmet>
				
				<span className="button-toggle-sidebar"><a tabIndex="-1" onClick={sidebarToggle} className="button default"><Icon name="menu" /></a></span>
				<h1 className="min">{title}</h1>

				{children}
			</div>

			
		</header>
	);
}