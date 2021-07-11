import React from 'react'
import t from '~t'

let _format
function getFormat() {
    if (!_format)
        _format = new Intl.DisplayNames(t.currentLang, {type: 'language'})
    return _format
}

export const codeToLanguage = (code) => {
    try{
        return getFormat().of(code)
    }catch(e){}

    return code
}

export const CodeToLanguage = React.memo(
    function({ date }) {
        return codeToLanguage(date)
    }
)