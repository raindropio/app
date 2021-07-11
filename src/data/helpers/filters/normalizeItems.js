export const normalizeItems = ({ tags, broken, duplicate, important, notag, types, created, lang }) => {
    let items = []

    if (important && important.count)
        items.push({ _id: 'important', count: important.count, query: 'important:true ', top: true })

    if (tags && tags.length)
        items.push({ _id: 'tags', count: tags.length, query: '#', top: true })

    if (types && types.length){
        items.push({ _id: 'type', query: 'type:', top: true })

        for(const type of types)
            items.push({ ...type, query: `type:${type._id} ` })
    }

    if (created && created.length){
        items.push(...[
            { _id: 'created', query: 'created:', top: true },
            { _id: 'before', query: 'before:', top: true },
            { _id: 'after', query: 'after:', top: true }
        ])

        for(const date of created)
            items.push(...[
                { ...date, query: `created:${date._id} ` },
                { ...date, query: `before:${date._id} ` },
                { ...date, query: `after:${date._id} ` }
            ])
    }

    if (lang && lang.length){
        items.push({ _id: 'lang', query: 'lang:', top: true })

        for(const l of lang)
            items.push({ ...l, query: `lang:${l._id} ` })
    }

    if (broken && broken.count)
        items.push({ _id: 'broken', count: broken.count, query: 'broken:true ', top: true })

    if (duplicate && duplicate.count)
        items.push({ _id: 'duplicate', count: duplicate.count, query: 'duplicate:true ', top: true })

    if (notag && notag.count)
        items.push({ _id: 'notag', count: notag.count, query: 'notag:true ', top: true })

    return items
}