import t from '~t'

const _formats = {}
function makeFormat(unit) {
    if (!_formats[unit])
        _formats[unit] = (new Intl.NumberFormat(t.currentLang, { maximumSignificantDigits: 2, style: 'unit', unit })).format
    return _formats[unit]
}

export function fileSize(_val=0) {
    if (!_val)
        return 0

    let style = '', val = parseInt(_val)
    if (val < 1000){
        style = 'byte'
    }
    if (val < 1000000){
        style = 'kilobyte'
        val = val / 1000
    }
    else if (val < 1000000000){
        style = 'megabyte'
        val = val / 1000000
    }
    else{
        style = 'gigabyte'
        val = val / 1000000000
    }
  
    try{
        return makeFormat(style)(val)
    } catch(e) {}

    return parseInt(val) + 
        (style[0]!='b' ? ' '+style[0].toUpperCase()+'b' : '') //for non bytes show kb,mb,gb...
}