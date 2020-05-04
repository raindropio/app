import React from 'react'
import Icon from '~co/common/icon'

export default React.memo(({ _id, src, className, size, selected })=>{
	if (src)
		return <img src={src} className={'collectionIcon '+className||''} loading='lazy' />

	var svgIcon = '', prefix = (selected ? '_active' : '')
	
	switch(_id){
		case 0: svgIcon = 'cloud'+prefix; break;
		case -1: svgIcon = 'inbox'+prefix; break;
		case -99: svgIcon = 'trash'+prefix; break;
		case -101: svgIcon = 'add'+prefix; break;
		default: svgIcon = 'default_collection'+prefix; break;
	}

	return <Icon name={svgIcon} className={'collectionIcon '+className||''} size={size} />
})