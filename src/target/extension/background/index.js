import commands from './commands'
import contextMenus from './contextMenus'
import omnibox from './omnibox'

Promise.all([
    commands(),
    contextMenus(),
    omnibox()
])