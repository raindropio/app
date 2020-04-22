import network from 'network'
import strings from '../modules/strings'
//import keyvalStore from '../stores/keyval'

var webextension;
if (typeof msBrowser != "undefined") webextension = msBrowser;
else if (typeof browser != "undefined") webextension = browser;
else if (typeof chrome != "undefined") webextension = chrome;

const isElectron = strings.getCurrentBrowser().indexOf("electron")!=-1;
var electronDefaults;

export default {
	isDesktop() {
		return isElectron;
	},

	isClipper() {
		return (window.location.search.indexOf('is_clipper')!=-1);
		return false;
	},

	isClipperSafari() {
		return (window.location.search.indexOf('is_clipper_safari')!=-1);
		return false;
	},

	version() {
		if (isElectron){
			return require('electron').remote.app.getVersion()+' (desktop)'
		}
		return __ABOUT__.version
	},

	onLoad() {
		if (isElectron){
			var remote = require('electron').remote;
			//var cwd = remote.process.cwd();

		    //Main menu
		    const menu = require("./electronMenu");
		    menu.init();

		    //Defaults
		    electronDefaults = remote.require("./defaults");
		}

		//if ((this.isClipper())&&(this.isClipperFrame()))
		//	window.bridgeSend({action: 'show', position: keyvalStore.onGet('clipper-position-reverse')?'left':'right'});
	},

	openWindow(params) {
		var url = params.url,
			name = params.name||"raindrop",
			w = params.w,
			h = params.h;

		//desktop electron
		if (isElectron){
			var remote = require('electron').remote;
			const {BrowserWindow} = remote;

			var w = new BrowserWindow({
				//modal: true, parent: remote.getCurrentWindow(),
				minWidth: 300, minHeight: 300,
				width: w, height: h, center: true, useContentSize: true,
				maximizable: false, minimizable: false,
				skipTaskbar: true,
				show: (params.showOnLoad ? false : true),
				titleBarStyle: "hidden",
				webPreferences: {
					nodeIntegration: false,
					webSecurity: true
				}
			});

			w.webContents.loadURL(url, {userAgent: params.userAgent});

			if (params.showOnLoad)
				w.once('ready-to-show', () => {
					setTimeout(()=>w.show(),150);
				});

			//close button on modal
			var appendClose = ()=>{
				w.webContents.executeJavaScript(`
					document.body.style["-webkit-app-region"]='drag';
					document.body.style["-webkit-user-select"]='none';
				`);
			}
			w.webContents.on('did-navigate', appendClose);
			w.webContents.on('did-navigate-in-page', appendClose);
			w.webContents.on('did-finish-load', appendClose);
			w.webContents.on('did-fail-load', appendClose);
			w.webContents.on('did-stop-loading', appendClose);
			w.webContents.on('dom-ready', appendClose);

			//on close
			w.on('closed', ()=>{
				if (typeof params.onClose == "function")
					params.onClose();

				if (typeof params.onMessage == "function")
					params.onMessage({}, "electron");
			});

			return w;
		}
		//web
		else{
			// Fixes dual-screen position                         Most browsers      Firefox
		    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

		    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		    var left = parseInt(((width / 2) - (w / 2)) + dualScreenLeft);
		    var top = parseInt(((height / 2) - (h / 2)) + dualScreenTop);

			var w = window.open(url, name, "width="+w+",height="+h+",top="+top+",left="+left+",resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no");
			if(w.focus) w.focus();

			w.onunload = function(){
				if (typeof params.onClose == "function")
					params.onClose();

				setTimeout(()=>window.removeEventListener("message", onWindowMessage, false),100);
			}

			var onWindowMessage = function(e){
				if (typeof params.onMessage == "function")
					params.onMessage(e.data, "web");
			}

			window.addEventListener("message", onWindowMessage, false);

			return w;
		}
	},

	resizeWindow(w,h) {
		if (!isElectron) return;

		w = w || electronDefaults.width;
		h = h || electronDefaults.height;

		var remote = require('electron').remote;
		var win = remote.getCurrentWindow();

		if (win.isFullScreen()) return;
		if (win.isMaximized()) return;

		//position
		var x, y, current = win.getBounds();
		x = current.x + parseInt((current.width - w)/2);
		y = current.y + parseInt((current.height - h)/2);

		win.setBounds({
			width: w,
			height: h,
			x: x,
			y: y
		},true);
	},

	getClipboardLink() {
		if (isElectron){
			var {clipboard} = require('electron');
			return clipboard.readBookmark();
		}

		return {title: "", url: ""};
	}
}