import browser from './browser'

export const hotkeys = {
    async getAll() {
        try{
            const commands = await browser.commands.getAll()
            if (commands?.[0]?.name)
                return commands
        } catch(e){
            console.log(e)
        }

        //fallback, get commands from manifest file
        //useful for safari, for some reason browser.commands.getAll doesn't work
        try{
            const { commands={} } = await browser.runtime.getManifest()
            const { os } = await browser.runtime.getPlatformInfo()

            return Object.entries(commands)
                .map(([name, { suggested_key={}, description='' }])=>{
                    var shortcut = suggested_key?.[os] || suggested_key?.default || ''

                    if (os == 'mac')
                        shortcut = shortcut.replace(/^Ctrl/, '⌘').replace(/^MacCtrl/, '⌃')

                    return {
                        name,
                        description,
                        shortcut
                    }
                })
                .filter(({ shortcut })=>shortcut)
        } catch(e) {}
        
        return [] 
    },

    async getByName(name) {
        const commands = await hotkeys.getAll()
        for(const command of commands)
            if (command.name == name)
                return command
    },

    link() {
        switch(process.env.EXTENSION_VENDOR) {
            case 'firefox':
                return 'https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox'

            case 'chrome':
            case 'edge':
            case 'opera':
                return 'chrome://extensions/shortcuts'
        }

        return undefined
    }
}