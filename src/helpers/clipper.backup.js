var browserName = "chrome"
if (window.navigator.userAgent.indexOf('Edge/')>0) browserName = "edge";
if (!!window.opera || /opera|opr/i.test(navigator.userAgent)) browserName = "opera";
if ('MozAppearance' in document.documentElement.style) browserName = "firefox";

var webextension={};
if (typeof msBrowser != "undefined") webextension = msBrowser;
else if (typeof browser != "undefined") webextension = browser;
else if (typeof chrome != "undefined") webextension = chrome;

var os = "";
if (navigator.appVersion.indexOf("Win")!=-1) os = "windows";
else if (navigator.appVersion.indexOf("Mac")!=-1) os = "mac";
else if (navigator.appVersion.indexOf("X11")!=-1) os = "unix";
else if (navigator.appVersion.indexOf("Linux")!=-1) os = "linux";

var getCurrentTab = (callback)=>{
	new Promise((res)=>{
			webextension.tabs.query({active: true, currentWindow: true}, (tabs=[])=>{
				res(tabs[0])
			});
		})
		.then((tab)=>{
			callback(tab);
		})
		.catch((e)=>{
			callback(false);
		})
}

var openTab = (url)=>{
	if (typeof webextension.tabs != "undefined")
		webextension.tabs.create({url: url});
}

var sendMessageToBackground = (obj,callback)=>{
	if (typeof webextension.runtime != "undefined"){
		webextension.runtime.sendMessage(obj, callback);
	}
}

//Prevent opening some pages
const preventedHashes = /\#\/(import|settings|account\/login|account\/signup)/g;
window.onhashchange = (e)=>{
	if (preventedHashes.test(window.location.hash||""))
		openTab("https://raindrop.io/app"+window.location.hash);
}

export default {
	extension: webextension,
	browserName: browserName,
	osName: os,
	getCurrentTab: getCurrentTab,
	sendMessageToBackground: sendMessageToBackground,
	openTab: openTab,
	
	sendMessage(obj, callback) {
		getCurrentTab((tab)=>{
			if (!tab) return;

			if (typeof webextension.tabs != "undefined")
				webextension.tabs.sendMessage(tab.id, obj, callback);
		});
	},

	setButtonStatus(obj) {
		sendMessageToBackground(Object.assign({action: "setStatus"}, obj), ()=>{})
	}
}