import s from './index.module.styl'
import React from 'react'

//data-size: icon|small
export default function Preloader({ className = '', ...etc }){
	return (
		<span className={s.preloader+' '+className} {...etc}>
			<svg className={s.circular} viewBox='0 0 40 40'>
				<circle cx='327' cy='96' r='12' transform='translate(-307 -76)'  className={s.path} fill='none'/>
			</svg>
		</span>
	);
}