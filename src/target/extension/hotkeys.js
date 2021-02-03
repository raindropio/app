import browser from './browser'

export const hotkeys = {
    async getAll() {
        return await browser.commands.getAll() || [] //[{ description, shortcut }]
    },

    link() {
        switch(process.env.EXTENSION_VENDOR) {
            case 'firefox':
                return 'https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox'

            case 'chrome':
            case 'opera':
                return 'chrome://extensions/shortcuts'
        }

        return undefined
    }
}