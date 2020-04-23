import React from 'react'
import ReactDom from 'react-dom'
import Icon from '~icon'
import t from '~t'
import config from '~config'

import settingsHelpers from './parts/helpers'

import MainWrap from '~co/columns/mainWrap'
import ReaderPop from '~co/pop/reader'
import keyvalStore from '~stores/keyval'
import keyvalActions from '~actions/keyval'
import UserStore from '~stores/user'

import Theme from './parts/theme'
import Broken from './parts/broken'

class Main extends React.Component {
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
        	t.initLang(lang);
            location.reload();//window.history.back();
        });
	}

	renderLanguages() {
		var languages = [];
		for(var code in config.languages)
        	languages.push(
        		<option key={code} value={code}>{config.languages[code]}</option>
        	);

        return (
        	<figure className="fieldWrap">
				<label className="fieldName">{t.s("language")}</label>
				
				<label className="selectBlank selectButton inline no-icon">
					<span className="caption">{config.languages[t.currentLang]}</span>
					<Icon className="fieldIcon arrow" name="arrow" />

					<select ref="lang" value={t.currentLang} onChange={this.handleLangChange.bind(this)}>
						{languages}
					</select>
				</label>
			</figure>
        );
	}

	render() {
		return (
			<section id="main">
				<header>
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
						
						<h1 className="min">{t.s("commonSettings")}</h1>
					</div>
				</header>

				<div id="mainBody">
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
				</div>
			</section>
		);
	}
}

export default MainWrap(Main)