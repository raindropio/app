import React from 'react'
import Icon from 'icon'
import t from 't'

export default class ImportDone extends React.Component {
	displayName = "settings/import/done"

	render() {
		return (
			<div className="centerContentWrap desktop-behavior">
				<div className="centerContent">
					<div className="centerContentBlock">
						<Icon name="24_cloud_active" className="svgIcon-size-60 color-theme" />
						<h1 className="extraHeadLabel">{t.format("importEnd")}</h1>
						<h2 className="mediumHeadLabel" style={{maxWidth:"500px"}}>{t.s("importIsProcessing")}</h2>
						<br />
						<p className="subHeadLabel" style={{maxWidth:"500px"}}>
							{t.s("importingProcess")}<br/><br/>
							{t.s("importIsProcessingDD")}
						</p>
					</div>
				</div>
			</div>
		);
	}
}