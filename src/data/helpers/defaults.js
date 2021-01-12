export const appendAfterArray = (a, val, index)=>{
    return [
        ...a.slice(0, index),
        val,
        ...a.slice(index)
    ]
}