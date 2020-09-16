import action from './action'
import commands from './commands'
import contextMenus from './contextMenus'
import links from './links'
import omnibox from './omnibox'

Promise.all([
    action(),
    commands(),
    contextMenus(),
    omnibox(),
    links()
])