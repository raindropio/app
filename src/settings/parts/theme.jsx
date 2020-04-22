import React from 'react'
import t from 't'

import keyvalActions from '../../actions/keyval'
import keyvalStore from '../../stores/keyval'

var themes = [
	'dark themeDark','default','sunset','sky','piano','beach','color1','color2','color3','color4','color5','color6','color7','color8'
];

export default class Theme extends React.Component {
	displayName: "settings/parts/theme"

	constructor(props) {
		super(props);

		this.state = {
        	theme: keyvalStore.onGet("theme")||"default",
        };
	}

	onKeyvalChange(all) {
		var theme = keyvalStore.onGet('theme')||"default";
		if (this.state.theme != theme)
			this.setState({theme: theme});
	}

	componentDidMount() {
        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));
    }

    componentWillUnmount() {
        if (this.unsubscribeKeyval) this.unsubscribeKeyval();
    }

	changeTheme(theme) {
		keyvalActions.set('theme',theme,true);

		var readerColor = "";

		if (theme.includes('themeDark'))
			readerColor = "night";

		UserStore.onUpdateConfig({font_color: readerColor});
	}

	renderList(onlySmall) {
		return themes.map((item,index)=>{
			var className = "themePreviewSmall";
			if ((item.indexOf("dark")==0)||(item=="default"))
				className = "";

			if ((onlySmall)&&(!className)) return null;
			if ((!onlySmall)&&(className)) return null;

			return <div key={index} className={className+" themePreview theme-sidebar-"+item+" "+(this.state.theme==item?"active":"")} onClick={(e)=>this.changeTheme(item)}><span className="themePreviewMain"><span/><span/><span/></span></div>;
		});
	}

	render() {
		

		return (
			<div>
				<figure className="fieldWrap no-border">
					<label className="fieldName">{t.s("interfaceStyle")}</label>
				</figure>

				<div className="themeList">{this.renderList(false)}</div>
				<div className="themeList small">{this.renderList(true)}</div>
			</div>
		);
	}
}