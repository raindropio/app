import React from 'react'
import Icon from '~icon'
import t from '~t'

export default class ImportNesting extends React.Component {
	displayName = "settings/import/nesting"

	render() {
		return (
			<div className="centerContentWrap desktop-behavior">
				<div className="centerContent">
					<div className="centerContentBlock">
						<Icon name="24_home_active" className="svgIcon-size-60 color-theme" />
						<h1 className="extraHeadLabel">{t.format("youHave")+" "+t.s("pro_nesting").toLowerCase()}</h1>
						<h2 className="mediumHeadLabel" style={{maxWidth:"500px"}}>
							{t.s("importBookmarks")+" "}
							{t.s("pro_nesting").toLowerCase()+" "}
							<a href="#/settings/upgrade">{t.s("onlyInPro")}</a>
						</h2>
						<br />
						<p className="subHeadLabel" style={{maxWidth:"500px"}}>
							{t.s("importWithoutNestedCollections")}
						</p><br />

						<a href="#/settings/import/collections" className="button blue standart">{t.s("continue")}</a>
					</div>
				</div>
			</div>
		);
	}
}