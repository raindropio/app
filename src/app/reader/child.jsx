import React from 'react'

export default function Child({show, onScroll, children}){
	return (
		<div className={"readerContent "+(!show ? "hidden" : "")} onScroll={onScroll}>
			<div className="readerContentHeaderPlaceholder"></div>

			{children}
		</div>
	);
}