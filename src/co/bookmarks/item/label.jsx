import React from 'react'

export default ({ Element='span', item, field, ...props })=>{
	let body = {}
	if (item.highlight && item.highlight[field]){
		//body could contain unescaped tags!!
		body.dangerouslySetInnerHTML = { __html: item.highlight[field] }
	}
	else if (item[field])
		body.children = item[field]
	else
		return null

	return (
		<Element {...props} {...body} />
	)
}