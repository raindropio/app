export const swapArrayElements = (a,x,y)=>{
    if (!a[x] || !a[y])
        return a

    return a.map((v, k) => {
        switch (k) {
            case x: return a[y];
            case y: return a[x];
            default: return v;
        }
    })
}

export const appendAfterArray = (a, val, index)=>{
    return [
        ...a.slice(0, index),
        val,
        ...a.slice(index)
    ]
}