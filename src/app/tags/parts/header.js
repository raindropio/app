import React from 'react'
import DocumentTitle from 'react-document-title'
import t from 't'
import Icon from 'icon'

const defaultTitle = t.s("tags")+" "+t.s('maintenance').toLowerCase()

export default ({children, actions, sidebarToggle, className, title=""})=>{
	title = title || defaultTitle

	return (
		<header className={className}>
			<div className="headerWrap">
				<DocumentTitle title={defaultTitle} />
				<span className="button-toggle-sidebar"><a tabIndex="-1" onClick={sidebarToggle} className="button default"><Icon name="menu" /></a></span>
				<h1 className="min">{title}</h1>

				{actions}
			</div>

			{children}
		</header>
	);
}