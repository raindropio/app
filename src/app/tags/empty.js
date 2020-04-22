import React from 'react'
import Icon from '~icon'
import t from '~t'
import Header from './parts/header'
import Preloader from '../../co/common/preloader'
import SuperImg from '../../co/common/superImg'

export default (props) => {
	return (
		<section id="main">
			<Header {...props} className="no-border" />

			<div id="mainBody">
				<div className="centerContentWrap desktop-behavior">
					<div className="centerContent">
						<div className="centerContentBlock">
							<SuperImg src="empty/tags.png" />
							<h2 className="headLabel">{t.s("noTags")}</h2>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}