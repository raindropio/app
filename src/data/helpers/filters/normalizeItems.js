export const normalizeItems = ({ broken, important, notag, types }) => {
    let items = []

    if (important && important.count)
        items.push({ _id: 'important', count: important.count, query: '❤' })

    if (types && types.length)
        for(const type of types)
            items.push({ ...type, query: `type:${type._id}` })

    if (broken && broken.count)
        items.push({ _id: 'broken', count: broken.count, query: '☠' })

    if (notag && notag.count)
        items.push({ _id: 'notag', count: notag.count, query: 'notag:1' })

    return items
}