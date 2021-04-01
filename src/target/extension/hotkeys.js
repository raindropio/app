import browser from './browser'

export const hotkeys = {
    async getAll() {
        let commands = [] //[{ description, shortcut }]
        
        try{
            commands = await browser.commands.getAll()
        } catch(e){
            console.log(e)
        }
        
        return Array.isArray(commands) ? commands : [] 
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