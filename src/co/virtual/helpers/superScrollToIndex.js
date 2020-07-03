export default (func, start, end, pos, align='')=>{
    if (!func)
        return

    if (pos < end && pos > start)
        return

    if (!align) {
        const startGap = Math.pow(start-pos, 2)
        const endGap = Math.pow(end-pos, 2)
        const min = Math.min(startGap, endGap)

        if (min == endGap)
            align = 'start'
        else
            align = 'end'
    }

    func({ index: pos, align })
}