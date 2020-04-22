import React from 'react'

export default function Preloader({className = ''}){
	return (
		<span className={"preloader "+className}>
			<svg className="preloaderCircular" viewBox="0 0 40 40">
				<circle cx="327" cy="96" r="12" transform="translate(-307 -76)"  className="preloaderPath" fill="none"/>
			</svg>
		</span>
	);//<circle className="preloaderPath" cx="50" cy="50" r="20" fill="none" />
}