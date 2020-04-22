import t from 't'
import bookmarksHelpers from './bookmarks'
import collectionsHelpers from './collections'

var electron = require('electron').remote;
var app = electron.app;
var shell = electron.shell;
const {Menu, MenuItem} = electron;

module.exports = {
	init: function() {
		var menu = this.defaultMenu();

		// Set top-level application menu, using modified template
		Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
	},

	defaultMenu: function() {
		var template = [
			{
		      label: t.s("file"),
		      submenu: [
		      	{
		          label: t.s("addBookmark"),
		          accelerator: 'CmdOrCtrl+N',
		          click: function() { bookmarksHelpers.createBlank() }
		        },
		        {
		          label: t.s("createNewCollection"),
		          accelerator: 'CmdOrCtrl+Shift+N',
		          click: function() { collectionsHelpers.createBlank({group:0}, {edit: true}) }
		        },
		        {
		          type: 'separator'
		        },
		        {
		          label: t.s("importBookmarks")+" "+t.s("elements2")+"...",
		          accelerator: 'Shift+CmdOrCtrl+I',
		          click: function() { window.location.hash = "#/settings/import";  }
		        },
		        {
		          label: t.s("exportBookmarks")+" "+t.s("elements2")+"...",
		          accelerator: 'Shift+CmdOrCtrl+E',
		          click: function() { window.location.hash = "#/settings/export";  }
		        },
		        {
		          type: 'separator'
		        },
		      	{
		          label: t.s("openInBrowser"),
		          accelerator: 'CmdOrCtrl+O',
		          click: function() { shell.openExternal(window.location.href); }
		        },
		        {
		          label: t.s("install")+" "+t.s("browserExtension").toLowerCase()+"...",
		          click: function() { window.location.hash = "#/install/extension";  }
		        }
		      ]
		    },
		    {
		      label: t.s("edit"),
		      submenu: [
		        {
		          label: 'Undo',
		          accelerator: 'CmdOrCtrl+Z',
		          role: 'undo'
		        },
		        {
		          label: 'Redo',
		          accelerator: 'Shift+CmdOrCtrl+Z',
		          role: 'redo'
		        },
		        {
		          type: 'separator'
		        },
		        {
		          label: 'Cut',
		          accelerator: 'CmdOrCtrl+X',
		          role: 'cut'
		        },
		        {
		          label: 'Copy',
		          accelerator: 'CmdOrCtrl+C',
		          role: 'copy'
		        },
		        {
		          label: 'Paste',
		          accelerator: 'CmdOrCtrl+V',
		          role: 'paste'
		        },
		        {
		          label: t.s("selectAll"),
		          accelerator: 'CmdOrCtrl+A',
		          role: 'selectall'
		        },
		      ]
		    },
		    {
		      label: t.s("view"),
		      submenu: [
		        {
		          label: t.s("refresh"),
		          accelerator: 'CmdOrCtrl+R',
		          click: function(item, focusedWindow) {
		            if (focusedWindow)
		              focusedWindow.reload();
		          }
		        },
		        {
		          label: t.s("fullscreen"),
		          accelerator: (function() {
		            if (process.platform === 'darwin')
		              return 'Ctrl+Command+F';
		            else
		              return 'F11';
		          })(),
		          click: function(item, focusedWindow) {
		            if (focusedWindow)
		              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
		          }
		        },
		        {
		          type: 'separator'
		        },
		        {
		        	label: t.s("interfaceStyle"),
		        	click: function() { window.location.hash = "#/settings/common";  }
		        }
		      ]
		    },
		    {
		      label: t.s("window"),
		      //role: 'window',
		      submenu: [
		        {
		          label: 'Minimize',
		          accelerator: 'CmdOrCtrl+M',
		          selector: 'performMiniaturize:'
		        },
		        {
		          label: 'Close',
		          accelerator: 'CmdOrCtrl+W',
		          selector: 'performClose:'
		        },
		        {
                    type: 'separator'
                }, {
                    label: 'Bring All to Front',
                    selector: 'arrangeInFront:'
                }, {
                    type: 'separator'
                }, {
                    label: 'Raindrop.io',
                    type: 'checkbox',
                    click() {
                        var win = electron.getCurrentWindow();
                        win.show();
                    }
                }
		      ]
		    },
		    {
		      label: t.s("help"),
		      role: 'help',
		      submenu: [
		        {
		          label: t.s("support"),
		          click: function() { shell.openExternal('https://help.raindrop.io') }
		        },
		      ]
		    },
		  ];

		  if (__DEV__){
		  	template.push({
		      label: "Development",
		      submenu: [
				{
		          label: 'Toggle Developer Tools',
		          accelerator: (function() {
		            if (process.platform === 'darwin')
		              return 'Alt+Command+I';
		            else
		              return 'Ctrl+Shift+I';
		          })(),
		          click: function(item, focusedWindow) {
		            if (focusedWindow)
		              focusedWindow.toggleDevTools();
		          }
		        }
		       ]
		   });
		  }


		  if (electron.process.platform === 'darwin') {
		    var name = app.getName();
		    template.unshift({
		      label: name,
		      submenu: [
		        {
					label: t.s("about"),
					click: function() { window.location.hash = "#/settings/about"; }
		        },
		        /*{
		        	label: t.s("checkForUpdates")+"...",
		        	visible: electron.process.mas,
					click: function() {
						electron.autoUpdater.checkForUpdates();
					}
		        },*/
		        {
		          type: 'separator'
		        },
		        {
		        	label: t.s("settings")+"...",
		        	accelerator: 'Command+,',
		        	click: function() { window.location.hash = "#/settings";  }
		        },
		        {
		          label: 'Services',
		          role: 'services',
		          submenu: []
		        },
		        {
		          type: 'separator'
		        },
		        {
		          label: t.s("hide")+' ' + name,
		          accelerator: 'Command+H',
		          role: 'hide'
		        },
		        {
		          label: t.s("hide")+" "+t.s("other"),
		          accelerator: 'Command+Shift+H',
		          role: 'hideothers'
		        },
		        {
		          label: t.s("show")+" "+t.s("all").toLowerCase(),
		          role: 'unhide'
		        },
		        {
		          type: 'separator'
		        },
		        {
		          label: t.s("quit") + " " + name,
		          accelerator: 'Command+Q',
		          click: function() { app.quit(); }
		        },
		      ]
		    });
		    var windowMenu = template.find(function(m) { return m.role === 'window' })
		    if (windowMenu) {
		      windowMenu.submenu.push(
		        {
		          type: 'separator'
		        },
		        {
		          label: 'Bring All to Front',
		          role: 'front'
		        }
		      );
		    }
		  }

		  return template;
	}
}