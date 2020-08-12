import React from 'react'
import t from '~t'
import Api from '~api'

import Main, { Header, Content } from '~co/screen/splitview/main'
import SuperImg from '~co/common/superImg'
import Button from '~co/common/button'

class Export extends React.Component {
	displayName = 'settings/export'

	constructor(props) {
		super(props);
		this.state = {
			text:''
		}
	}

	handleExport() {
		Api.getText('export', (text)=>{
			this.setState({text:text});
		})
	}

	render() {
		var content;
		if (this.state.text)
			content = <p style={{maxWidth:'400px'}}>{this.state.text}</p>;
		else
			content = (
				<div>
					<h1 className='extraHeadLabel'>{t.s('allBookmarks')}</h1>
					<br/>
					<Button variant='primary' onClick={this.handleExport.bind(this)} target='_blank'>{t.s('sendEmail')}</Button>
				</div>
			);

		return (
			<Main>
				<Header title={`${t.s('exportBookmarks')} ${t.s('elements2')}`} />

				<Content>
					<div className='centerContentWrap'>
						<div className='centerContent'>
							<div className='centerContentBlock'>
								{content}
							</div>
						</div>
					</div>
				</Content>

				<div className='promoScreen'>
					<SuperImg src='empty/export.png' />
				</div>
			</Main>
		);
	}
}

export default Export