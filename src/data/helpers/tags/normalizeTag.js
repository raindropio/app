export const normalizeTag = (tag={})=>{
    const _id = tag._id || tag.name

    return ({
        ...tag,
        _id,
        query: _id.includes(' ') ? `"#${_id}"` : `#${_id}`
    })
}