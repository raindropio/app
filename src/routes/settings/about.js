import React from 'react'
import t from '~t'
import environment from '~modules/environment'

import Main, { Header, Content } from '~co/screen/splitview/main'
import SuperImg from '~co/common/superImg'

class About extends React.Component {
	displayName = 'settings/about'

	componentDidMount() {
		if (!environment.isClipper()){
			var tw = document.createElement('script');
			//only executes in another environment. also can't be executed because violates content_security_policy!!
			//its twitter, nothing special
			tw.setAttribute('src','https://platform.twitter.com/widgets.js');
			document.head.appendChild(tw);
		}
	}

	render() {
		return (
			<Main>
				<Header title={t.s('about')} />

				<Content>
					<div className='centerContentWrap desktop-behavior'>
						<div className='centerContent'>
							<div className='centerContentBlock'>
								<SuperImg src='marketing/logoIcon.png' height='72' />
								<h1 className='extraHeadLabel'>Raindrop.io {environment.version()}</h1>
								<p className='subHeadLabel'>Handcrafting since 2013 by <a href='https://twitter.com/exentrich' target='_blank'>Rustem Mussabekov</a> in Saint Petersburg</p>

								<br /><br />
								<div style={{height:'20px',display:'block'}}>
									<a href='https://twitter.com/raindrop_io' className='twitter-follow-button' data-show-count='false' target='_blank'>Follow @raindrop_io on Twitter</a>
								</div>
							</div>
						</div>
					</div>
				</Content>
			</Main>
		);
	}
}

export default About