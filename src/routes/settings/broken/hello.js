import React from 'react'
import t from '~t'
import SuperImg from '~co/common/superImg'

export default (props) => {
	const brokenLabel = t.s("broken") + " " + t.s("links").toLowerCase();

	return (
		<div className="translateFromTopSlightly">
			<div className="centerContentWrap desktop-behavior">
				<div className="centerContent">
					<div className="centerContentBlock">
						<SuperImg src="empty/brokenTip.png" />

						<h2 className="headLabel">Go to particular collection and click on "Broken" filter<br/> to find broken links</h2>
						<a className="button active" href="#/space/0/%5B%7B%22key%22%3A%22broken%22%2C%22val%22%3A%221%22%7D%5D">
							{t.s('show')+" "+t.s("all").toLowerCase()}&nbsp;{brokenLabel.toLowerCase()}&nbsp;({props.count})
						</a>

						<a className="button active" href="#/settings/common">
							{t.s('settings')}
						</a>

						<a className="button active" href="https://help.raindrop.io/broken" target="_blank">
							{t.s('howToUse')}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}