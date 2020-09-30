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
                saveLink: {
                    message: s(lang, 'save') + ' ' + s(lang, 'link').toLowerCase(),
                    description: ''
                },
                saveImage: {
                    message: s(lang, 'save') + ' ' + s(lang, 'image').toLowerCase(),
                    description: ''
                },
                saveVideo: {
                    message: s(lang, 'save') + ' ' + s(lang, 'video').toLowerCase(),
                    description: ''
                }
            },
            null,
            2
        ))
    }
}