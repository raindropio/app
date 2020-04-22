import React from 'react'
import strings from '../modules/strings'
import MobileDetect from 'mobile-detect'

var md = new MobileDetect((typeof window != "undefined" ? window.navigator.userAgent : null))

export default class Main extends React.Component {
	displayName: "install/blank"

	componentWillMount() {
		var isMac = (strings.getCurrentBrowser().indexOf('mac')!=-1);
		var goPath = "windows";

		if (md.mobile()){
			if (isMac)
				goPath="ios";
			else
				goPath="android";
		}
		else {
			if (isMac)
				goPath="mac";
		}

		return window.location.hash="#/install/"+goPath;
    }

	render() {
		return null;
	}
}