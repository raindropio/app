export function getLanguage() {
    try{
        const lang = navigator.language || navigator.userLanguage || ''
        return lang.trim().toLowerCase()
    }catch(e){}
    return ''
}