const fs = require('fs')
const path = require('path')

const folder = path.resolve(__dirname, '../../../assets/languages')
const _strings = {}
const overrideLangCode = {
    'zh-Hans': 'zh_CN',
    'zh-Hant': 'zh_TW'
}

function s(lang, key) {
    for(const load of ['en', lang])
        if (!_strings[load])
            _strings[load] = JSON.parse(
                fs.readFileSync(`${folder}/${load}.json`)
            )

    return _strings[lang][key] || _strings['en'][key] || key
}

module.exports = ({ emitFile })=>{
    //supported languages
    const languages = Object.entries(
        JSON.parse(
            fs.readFileSync(`${folder}/index.json`)
        )
    ).map(([lang])=>lang)

    for(const lang of languages){
        emitFile(`_locales/${overrideLangCode[lang] || lang}/messages.json`, JSON.stringify(
            {
                appDesc: {
                    message: s(lang, 'raindropTagline'),
                    description: ''
                },
                savePage: {
                    message: s(lang, 'saveLink'),
                    description: ''
                },
                savePageOrHighlight: {
                    message: s(lang, 'extSavePageOrHighlight'),
                    description: ''
                },
                saveLink: {
                    message: s(lang, 'extSaveLink'),
                    description: ''
                },
                saveImage: {
                    message: s(lang, 'extSaveImage'),
                    description: ''
                },
                saveVideo: {
                    message: s(lang, 'extSaveVideo'),
                    description: ''
                },
                saveHighlight: {
                    message: s(lang, 'addHighlights'),
                    description: ''
                },
                saveTabs: {
                    message: s(lang, 'saveTabs'),
                    description: ''
                },
                openRaindrop: {
                    message: s(lang, 'extOpenWebsite'),
                    description: ''
                },
                openSidePanel: {
                    message: s(lang, 'extOpenSidePanel'),
                    description: ''
                },
                openApp: {
                    message: s(lang, 'extOpenApp'),
                    description: ''
                },
                in: {
                    message: s(lang, 'extInRaindrop'),
                    description: ''
                },
                settings: {
                    message: s(lang, 'settings'),
                    description: ''
                }
            },
            null,
            2
        ))
    }
}