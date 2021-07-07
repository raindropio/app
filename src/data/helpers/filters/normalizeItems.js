export const normalizeItems = ({ broken, duplicate, important, notag, types }) => {
    let items = []

    if (important && important.count)
        items.push({ _id: 'important', count: important.count, query: 'important:true' })

    if (types && types.length)
        for(const type of types)
            items.push({ ...type, query: `type:${type._id}` })

    if (broken && broken.count)
        items.push({ _id: 'broken', count: broken.count, query: 'broken:true' })

    if (duplicate && duplicate.count)
        items.push({ _id: 'duplicate', count: duplicate.count, query: 'duplicate:true' })

    if (notag && notag.count)
        items.push({ _id: 'notag', count: notag.count, query: 'notag:true' })

    return items
}