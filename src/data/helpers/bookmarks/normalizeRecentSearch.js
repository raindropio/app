export const normalizeRecentSearch = (search={})=>{
    const _id = String(search._id)

    return ({
        _id,
        collectionRef: parseInt(search.collectionRef),
        query: _id+' ',
        date: search.date
    })
}