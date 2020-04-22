import React from 'react'
import Icon from '~icon'
import { abbreviateNumber } from '../../../modules/strings'

export default function Rating({rating={},enabled=true}){
	var value = 0;
	try{value=rating.value||0}catch(e){}

	if (!value) return null;
	if (!enabled) return null;

	return (
		<span className="rating">
			<Icon name="best" size="micro"/><span className="ratingValue">{abbreviateNumber(value)}</span>
		</span>
	);
}