import t from '~t'

const _formats = {}
function makeFormat(unit) {
    if (!_formats[unit]){
        if (typeof Intl == 'undefined' || !Intl.NumberFormat)
            _formats[unit] = (v)=>v
        else
            _formats[unit] = (new Intl.NumberFormat(t.currentLang, { maximumSignificantDigits: 2, style: 'unit', unit })).format
    }
    return _formats[unit]
}

export function fileSize(val=0) {
    if (!val)
        return 0
  
    if (val < 1000)
        return makeFormat('byte')(val)
    if (val < 1000000)
        return makeFormat('kilobyte')(val / 1000)
    else if (val < 1000000000)
        return makeFormat('megabyte')(val / 1000000)
    else
        return makeFormat('gigabyte')(val / 1000000000)
}