import commands from './commands'
import contextMenus from './contextMenus'

Promise.all([
    commands(),
    contextMenus()
])