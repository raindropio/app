const rules = [
    { regex: /(#)([^\s#]*)/gmi, override_key: 'tag' },
    { regex: /(\w+):(.+)/gmi },
]

const hardcoded = [
    { find: '❤', key: 'important', val: '1' },
    { find: '☠', key: 'broken', val: '1' },
]

export default function(s) {
    let query = String(s)
    let items = []

    //rules
    for(const { regex, override_key='' } of rules){
        for(const [_, key, val] of query.matchAll(regex))
            items.push({ key: override_key||key, val })
        query = query.replace(regex, '')
    }

    //hardcoded
    for(const {find, key, val} of hardcoded)
        if (query.includes(find)){
            items.push({ key, val })
            query = query.replace(find, '')
        }

    if (query.trim())
        items.push({ key: 'word', val: query.trim() })

    return items
}