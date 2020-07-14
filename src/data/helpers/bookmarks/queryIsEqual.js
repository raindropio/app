export const queryIsEqual = function(original={}, newone={}) {
    const entries = Object.entries(newone)

    for(const [key, val] of entries)
        if (original[key] != val)
            return false
    
    return true
}