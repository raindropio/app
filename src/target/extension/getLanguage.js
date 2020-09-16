import browser from './browser'

export function getLanguage() {
    try{
        const lang = browser.i18n.getUILanguage()
        return lang.trim().toLowerCase()
    }catch(e){console.log(e)}

    return ''
}