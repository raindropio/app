import React from 'react'

import { ItemIcon } from '~co/common/list'
import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

const CollectionIcon = React.memo(({ _id, cover, active, loading })=>{
	if (loading)
		return <Preloader />

	if (cover && cover[0])
		return <img src={cover[0]} alt='★' />

	var name = '', prefix = (active ? '_active' : '')
	
	switch(_id){
		case 0: name = 'cloud'+prefix; break;
		case -1: name = 'inbox'+prefix; break;
		case -99: name = 'trash'+prefix; break;
		case -100: case -101: name = 'add'+prefix; break;
		default: name = 'default_collection'+prefix; break;
	}

	return <Icon name={name} />
})

export default ({ className, ...etc }) => (
	<ItemIcon className={className}>
		<CollectionIcon {...etc} />
	</ItemIcon>
)