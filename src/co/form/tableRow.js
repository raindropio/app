import React from 'react'

export default function TableRow({title="",children=null}){
	return (
		<div className="row">
            <label className="cell">{title}</label>
            <div className="cell">
                {children}
            </div>
        </div>
	);
}