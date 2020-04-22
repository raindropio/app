import React from 'react'
import t from 't'
import Api from 'api'
import _ from 'lodash'

import Item from './item'

const _prefix = "interest_";

export default class Examples extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: (Api.getItem('hide-examples')==null?true:false)
		}
	}

	componentWillMount() {
		this.items = [
			{title: t.s(_prefix+"technology"), cover_path: "aa/w112"},
			{title: t.s(_prefix+"technology_applications"), cover_path: "aa/w25"},
			{title: t.s(_prefix+"cars_motorcycles"), cover_path: "car"},
			{title: t.s(_prefix+"fashion"), cover_path: "aa/k47"},
			{title: t.s(_prefix+"developers"), cover_path: "aa/k27"},
			{title: t.s(_prefix+"education"), cover_path: "aa/k36"},
			{title: t.s(_prefix+"film_music_books"), cover_path: "aa/k48"},
			{title: t.s(_prefix+"technology_games"), cover_path: "aa/w62"},
			{title: t.s(_prefix+"health_fitness"), cover_path: "aa/k80"},
			{title: t.s(_prefix+"design_inspiration"), cover_path: "aa/k31"},
			{title: t.s(_prefix+"food_drink_recipes"), cover_path: "aa/j185"},
			{title: t.s(_prefix+"sites"), cover_path: "aa/k87"},
			{title: t.s(_prefix+"sport"), cover_path: "aa/u16"},
			//{title: t.s(_prefix+"pictures"), cover_path: "aa/k85"},
			{title: t.s(_prefix+"psychology_self_development"), cover_path: "aa/k41"},
			{title: t.s(_prefix+"science"), cover_path: "space/k21"},
			{title: t.s(_prefix+"travel"), cover_path: "aa/k78"}
		];
		this.items = _.orderBy(this.items, ['title'], ["asc"]);
	}

	getCover(path) {
		return {cover: ["/img/templates/"+path+".png"]};
	}

	toggleShow() {
		if (!this.state.show)
			Api.removeItem('hide-examples');
		else
			Api.setItem('hide-examples','1');

		this.setState({show: !this.state.show})
	}

	render() {
		var items = [];

		if (this.state.show)
			items = this.items.map((item,index)=>{
				if (item)
					return <Item key={"item"+index}
								item={Object.assign(item, this.getCover(item.cover_path))}
								onClick={this.props.onClick} />;

				return null;
			})

		return (
			<section>
				<div className="group" onClick={this.toggleShow.bind(this)}>
					<div className="title">{t.s("suggested")}</div>
					<a className="toggle" tabIndex="-1">{t.s(!this.state.show ? "show" : "hide")}</a>
				</div>

				{items}
			</section>
		);
	}
}