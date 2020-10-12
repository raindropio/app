export const hotkeys = {
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