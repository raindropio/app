import React from 'react'
import Header from './parts/header'
import Preloader from '~co/common/preloader'

export default (props) => {
	return (
		<section id="main">
			<Header {...props} className="no-border" />

			<div id="mainBody">
				<div className="centerContentWrap desktop-behavior">
					<div className="centerContent">
						<div className="centerContentBlock">
							<Preloader />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}