export const normalizeTag = (tag={})=>{
    const _id = tag._id || tag.name

    return ({
        _id,
        count: tag.count||0,
        query: _id.includes(' ') ? `"#${_id}"` : `#${_id}`
    })
}