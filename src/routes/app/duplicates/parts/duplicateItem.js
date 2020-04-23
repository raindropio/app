import React from 'react'
import { humanDate } from '~modules/strings'
import Path from './path'

export default ({created, lastUpdate, _id, collection, title, excerpt, newest, link, selected, changeSelection})=>{
	return (
		<div className="duplicate-item" data-selected={selected}>
			<label className="di-date">
				<input type="checkbox" checked={selected} onChange={()=>changeSelection(_id)} />
				{humanDate(created || lastUpdate)}
				{/*newest ? <b>N</b> : null*/}
			</label>

			<Path {...{_id, collection, title, excerpt, link}} />
		</div>
	);
}