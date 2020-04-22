import React from 'react'
import Icon from 'icon'

export default function Tags({tags=[],appendQuery}){
	var items = []

	if ((tags||[]).length)
		tags.forEach(function(tag,index) {
			var tagStr = tag;
			//if (index==0)
			//	tagStr = tag.charAt(0).toUpperCase() + tag.slice(1);
			items.push(<a tabIndex="-1" key={index} href="" onClick={(e)=>{e.preventDefault();appendQuery('tag',tag)}}><Icon name="tag" size="micro" />{tagStr}</a>);
			/*if (index!=tags.length-1)
				items.push(" ");*/
		});
	
	if (!items.length)
		return null;

	return (
		<p>
		<span className="tags">
			{items}
		</span>
		</p>
	);
}