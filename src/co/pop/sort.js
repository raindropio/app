import React from 'react'
import t from '~t'
import Icon from '~icon'

import Pop from '~actions/pop'

export default class SortPop extends React.Component {
	displayName = "pop/sort"
	options = {}

	constructor(props) {
		super(props);
		this.state={};

		this.options = {
			'score': {title: t.s('byRelevance')},
			'sort': {title: t.s('manual')},
			'-created': {title: t.s("byDate")+' ↓'},
			'created': {title: t.s("byDate")+' ↑'},
			title: {title: t.s("byName")+' (A-Z)'},
			'-title': {title: t.s("byName")+' (Z-A)'},
			domain: {title: t.s("sites")+' (A-Z)'},
			'-domain': {title: t.s("sites")+' (Z-A)'},
		}
	}

	onClick(key) {
		Pop.close();
		setTimeout(()=>this.props.onChange(key),150);
	}

	renderOption(key,active) {
		return (
			<a key={key} disabled={(this.props.disableScoreSort && key == 'score') || (this.props.disableCustomSort && (key=='-sort' || key=='sort'))} className={"contextMenuItem "+(active?"active":"")} onClick={()=>this.onClick(key)}>
				<Icon name={"sort_"+key+(active?"_active":"")} />
				<span className="title">{this.options[key].title}</span>
			</a>
		);
	}

	render() {
		var options = [];
		for(var i in this.options)
			options.push(this.renderOption(i, i==this.props.active));

		return (
			<div className="popBodySort">
				<div className="superForm"><figure className="fieldWrap no-border">
					<label className="fieldName" style={{paddingBottom: 6, paddingTop: 14}}>{t.s("sortBy")}</label>
				</figure></div>

				<div className="contextMenuList size-medium selectable">
					{options}
				</div>
			</div>
		);
	}
}