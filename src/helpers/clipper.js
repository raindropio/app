import environment from './environment'

var bridgeCallbacks = {};

var sendToParent = (args, callback)=>{
	if (typeof callback == "function")
		bridgeCallbacks[args.action] = callback;
	parent.postMessage(args,'*');
}

if (environment.isClipper()){
	window.addEventListener("message", function(e){
		if (typeof bridgeCallbacks[e.data.action] == "function"){
			bridgeCallbacks[e.data.action](e.data.content);
			delete bridgeCallbacks[e.data.action];
		}
	});
	
	//Prevent opening some pages
	const preventedHashes = /\#\/(import|account\/login|account\/signup)/g;
	window.onhashchange = (e)=>{
		if (window.safariNativeExtension)
			return;
			
		if (preventedHashes.test(window.location.hash||""))
			openTab("https://raindrop.io/app"+window.location.hash);
	}
}

export function getCurrentTab(callback) {
	if (window.safariNativeExtension)
		return window.safariNativeExtension.getCurrentTab().then(callback).catch(e=>callback(null))

	sendToParent({action: "currentTab"}, callback);
}

export function setButtonStatus(obj) {
	if (window.safariNativeExtension)
		return window.safariNativeExtension.setButtonStatus(obj)

	sendToParent(Object.assign({action: "setButtonStatus"}, obj));
}

export function parse(url, callback) {
	if (window.safariNativeExtension && window.safariNativeExtension.parse)
		return window.safariNativeExtension.parse(url).then(callback).catch(e=>callback(null))

	sendToParent({action: "parse", url}, callback)
}

export function capturePage(url, callback) {
	if (window.safariNativeExtension && window.safariNativeExtension.parse)
		return window.safariNativeExtension.capturePage(url).then(callback).catch(e=>callback(null))

	sendToParent({action: "capturePage", url}, callback)
}

export function openTab(url) {
	if (window.safariNativeExtension)
		return window.safariNativeExtension.openTab(url)

	sendToParent({action: "openTab", url: url});
}