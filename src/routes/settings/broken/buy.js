import React from 'react'
import t from '~t'
import SuperImg from '~co/common/superImg'

export default () => {
	return (
		<div className="centerContentWrap desktop-behavior">
			<div className="centerContent">
				<div className="centerContentBlock">
					<SuperImg src="empty/broken.png" />
					<h2 className="headLabel">{t.s("broken") + " " + t.s('links').toLowerCase() + " " + t.s("onlyInPro")}</h2>
					<br/>
					<a className="button blue standart" href="#/settings/upgrade">{t.s("goToPRO")}</a>
				</div>
			</div>
		</div>
	);
}