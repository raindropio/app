import React from 'react'
import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

export default React.memo(({ _id, cover, className, size, active, loading })=>{
	if (loading)
		return <Preloader className='collectionIcon' data-size='icon' />

	if (cover && cover[0])
		return <img src={cover[0]} className={'collectionIcon '+className||''} loading='lazy' />

	var name = '', prefix = (active ? '_active' : '')
	
	switch(_id){
		case 0: name = 'cloud'+prefix; break;
		case -1: name = 'inbox'+prefix; break;
		case -99: name = 'trash'+prefix; break;
		case -100: case -101: name = 'add'+prefix; break;
		default: name = 'default_collection'+prefix; break;
	}

	return <Icon name={name} className={'collectionIcon '+className||''} data-size={size} />
})