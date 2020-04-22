import React from 'react'
import Icon from '~icon'
import t from '~t'
import config from '~config'

import helpers from './helpers'

export default class ImportStart extends React.Component {
	displayName = "settings/import/start"

	constructor(props) {
		super(props)

		this.state = {
			importDuplicates: helpers.importDuplicates
		}

		this.importDuplicates = this.importDuplicates.bind(this)
	}

	importDuplicates() {
		helpers.importDuplicates = !helpers.importDuplicates
		this.setState({importDuplicates: helpers.importDuplicates})
	}

	render() {
		return (
			<div className="centerContentWrap desktop-behavior">
				<div className="centerContent">
					<div className="centerContentBlock">
						<h1 className="extraHeadLabel">{t.format("importBookmarksD", "Pocket, Pinboard, Diigo, Instapaper")}</h1>
						<br />
						
						<div style={{maxWidth:"100%",display:"inline-flex",alignItems:"center",justifyContent:"center",flexWrap:'wrap'}}>
							<div className="button blue standart select">
								<Icon name="upload_active" />&nbsp;&nbsp;
								<span>{t.s('upload')} {t.format("importInfo1", "50")}</span>
								<input type="file" ref="file" onChange={(e)=>helpers.handleFile(this,e,"html")} />
							</div>
						</div>

						<br /><br />
						<p className="subHeadLabel" style={{maxWidth:"500px"}}>{t.s("importInfo2")} (Netscape HTML format)</p>
						
						<br />
						<div className="superForm">
							<div className="fieldLink fieldColumns" style={{margin: '0 auto'}} onClick={this.importDuplicates}>
								<span className={"extra-checkbox"+(this.state.importDuplicates?" active":"")} />

								<span>
									{t.s('importBookmarks')} {t.s("duplicates").toLowerCase()}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}