import React from 'react'
import { getCurrentBrowser } from '~modules/strings'
import isMobile from 'ismobilejs'

export default class Main extends React.Component {
	displayName = "install/blank"

	componentDidMount() {
		var isMac = (getCurrentBrowser().indexOf('mac')!=-1);
		var goPath = "windows";

		if (isMobile(navigator.userAgent).phone){
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