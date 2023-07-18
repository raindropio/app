import action from './action'
import commands from './commands'
import contextMenus from './contextMenus'
import links from './links'
import omnibox from './omnibox'
import runtime from './runtime'
import storage from './storage'
import highlights from './highlights'
import popup from './popup'
import fixSafariPermissions from './fix-safari-permissions'

action()
commands()
contextMenus()
omnibox()
links()
runtime()
storage()
highlights()
popup()
fixSafariPermissions()