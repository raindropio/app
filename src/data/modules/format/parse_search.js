const rules = [
    { regex: /(#)([^\s#]*)/gmi, override_key: 'tag' },
    { regex: /(\w+):(.+)/gmi },
]

export default function(s) {
    let query = String(s)
    let items = []

    for(const { regex, override_key='' } of rules){
        for(const [_, key, val] of query.matchAll(regex))
            items.push({ key: override_key||key, val })
        query = query.replace(regex, '')
    }

    if (query.trim())
        items.push({ key: 'word', val: query.trim() })

    return items
}