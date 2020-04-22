import React from 'react'
import DocumentTitle from 'react-document-title'
import t from '~t'
import Icon from '~icon'

export default ({children, sidebarToggle, className})=>{
	return (
		<header className={className}>
			<div className="headerWrap">
				<DocumentTitle title={t.s("duplicates")} />
				<span className="button-toggle-sidebar"><a tabIndex="-1" onClick={sidebarToggle} className="button default"><Icon name="menu" /></a></span>
				<h1 className="min">{t.s("duplicates")}</h1>

				{children}
			</div>

			
		</header>
	);
}