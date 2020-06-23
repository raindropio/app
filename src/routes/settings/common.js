import React from 'react'
import ReactDom from 'react-dom'
import Icon from '~co/common/icon'
import t from '~t'
import supportedLangs from '~assets/languages/index.json'

import Main, { Header, Content } from '~co/screen/splitview/main'
import ReaderPop from '~co/pop/reader'
import keyvalStore from '~stores/keyval'
import keyvalActions from '~actions/keyval'
import UserStore from '~stores/user'

import Button from '~co/common/button'
import Theme from './parts/theme'
import Broken from './parts/broken'

class Common extends React.Component {
	displayName = "settings/common"

	constructor(props) {
		super(props);
		this.state = this.prepareState();
	}

	prepareState() {
		return {
			fontSize: keyvalStore.onGet("font-size")||"s"
		}
	}

	componentDidMount() {
        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribeKeyval();
    }

    onKeyvalChange() {
    	this.setState(this.prepareState());
    }

    changeFontSize(size) {
    	keyvalActions.set('font-size', size, true);
    }

    handleLangChange(e) {
		e.preventDefault();
        var select = ReactDom.findDOMNode(this.refs.lang);
        var lang = select.options[select.selectedIndex].value;

        UserStore.onUpdateLanguage({lang:lang}, function(){
        	t.init(lang)
        })
	}

	renderLanguages() {
		var languages = [];
		for(var code in supportedLangs)
        	languages.push(
        		<option key={code} value={code}>{supportedLangs[code]}</option>
			);
			
        return (
        	<figure className="fieldWrap">
				<label className="fieldName">{t.s("language")}</label>
				
				<Button variant='outline'>
					<span className="caption">{supportedLangs[t.currentLang]}</span>
					<Icon className="fieldIcon arrow" name="arrow" />

					<select ref="lang" value={t.currentLang} onChange={this.handleLangChange.bind(this)}>
						{languages}
					</select>
				</Button>
			</figure>
        );
	}

	render() {
		return (
			<Main>
				<Header title={t.s('commonSettings')} />

				<Content>
					<div className="superForm">
						<Theme />

						{this.renderLanguages()}

						<figure className="fieldWrap no-border">
							<label className="fieldName">{t.s("fontSize")}</label>
						</figure>

						<div className="fieldLink fieldColumns" onClick={this.changeFontSize.bind(this,"xs")}>
							<input type="radio" name="fontSize" checked={this.state.fontSize=="xs"} readOnly />

							<span>
								{t.s("XS")}
							</span>
						</div>

						<div className="fieldLink fieldColumns" onClick={this.changeFontSize.bind(this,"s")}>
							<input type="radio" name="fontSize" checked={this.state.fontSize=="s"} readOnly />

							<span>
								{t.s("S")}
							</span>
						</div>

						<div className="fieldLink fieldColumns" onClick={this.changeFontSize.bind(this,"m")}>
							<input type="radio" name="fontSize" checked={this.state.fontSize=="m"} readOnly />

							<span>
								{t.s("M")}
							</span>
						</div>

						<div className="fieldLink fieldColumns" onClick={this.changeFontSize.bind(this,"l")}>
							<input type="radio" name="fontSize" checked={this.state.fontSize=="l"} readOnly />

							<span>
								{t.s("L")}
							</span>
						</div>

						<Broken/>
					</div>

					<div className="hide-on-clipper"><ReaderPop/></div>
				</Content>
			</Main>
		);
	}
}

export default Common