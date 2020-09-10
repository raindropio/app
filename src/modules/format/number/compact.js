import t from '~t'

let _format
function getFormat() {
    if (!_format)
        _format = new Intl.NumberFormat(t.currentLang, { notation: 'compact' }).format

    return _format
}

export function compact(val=0) {
    try{ return getFormat()(val) }catch(e){}
    return val
}