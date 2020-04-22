import React from 'react'
import moment from 'moment'

import Path from './path'

export default ({created, lastUpdate, _id, collection, title, excerpt, newest, link, selected, changeSelection})=>{
	return (
		<div className="duplicate-item" data-selected={selected}>
			<label className="di-date">
				<input type="checkbox" checked={selected} onChange={()=>changeSelection(_id)} />
				{shortDate(created || lastUpdate)}
				{/*newest ? <b>N</b> : null*/}
			</label>

			<Path {...{_id, collection, title, excerpt, link}} />
		</div>
	);
}

const shortDate = (d)=>{
	var f = 'MMM D', mom = moment(d);
	if (moment().year()!=mom.year())
		f+=", Y";

	return mom.format(f)
}