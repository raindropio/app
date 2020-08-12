import React from 'react'
import Icon from '~co/common/icon'
import t from '~t'

export default class ImportDone extends React.Component {
	displayName = "settings/import/done"

	render() {
		return (
			<div className="centerContentWrap">
				<div className="centerContent">
					<div className="centerContentBlock">
						<Icon name="24_cloud_active" enlarge="3" className='color-theme' />
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