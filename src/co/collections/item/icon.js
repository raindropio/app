import React from 'react'
import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

export default React.memo(({ _id, cover, className, size, active, loading })=>{
	if (loading)
		return <Preloader className='collectionIcon size-icon' />

	if (cover && cover[0])
		return <img src={cover[0]} className={'collectionIcon '+className||''} loading='lazy' />

	var svgIcon = '', prefix = (active ? '_active' : '')
	
	switch(_id){
		case 0: svgIcon = 'cloud'+prefix; break;
		case -1: svgIcon = 'inbox'+prefix; break;
		case -99: svgIcon = 'trash'+prefix; break;
		case -100: case -101: svgIcon = 'add'+prefix; break;
		default: svgIcon = 'default_collection'+prefix; break;
	}

	return <Icon name={svgIcon} className={'collectionIcon '+className||''} size={size} />
})