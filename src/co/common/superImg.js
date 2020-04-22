import React from 'react'

export default function superImg({src,className="",width,height,style={}}){
	var retina = src, indexOfExt = src.lastIndexOf('.');
	retina = retina.substr(0, indexOfExt) + "@2x" + retina.substr(indexOfExt);
	retina = require("../../assets/"+retina).default;

	var nonRetina = require("../../assets/"+src).default;

	//src={nonRetina} 
	return (
		<img srcSet={nonRetina+" 1x, "+retina+" 2x"} src={nonRetina} className={className} width={width} height={height} style={style} />
	);
}