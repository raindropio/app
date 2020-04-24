import React from 'react'
import t from '~t'
import SuperImg from '~co/common/superImg'

export default () => {
	return (
		<div className="centerContentWrap desktop-behavior">
			<div className="centerContent">
				<div className="centerContentBlock">
					<SuperImg src="empty/broken.png" />
					<h2 className="headLabel">{t.s("nothingFound")}</h2>
				</div>
			</div>
		</div>
	);
}