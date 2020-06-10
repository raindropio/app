export default (func, start, end, pos, align)=>{
    if (!func)
        return

    if (pos < end && pos > start)
        return

    if (pos == end)
        pos = pos + 1

    if (pos == start)
        pos = pos - 1

    const startGap = Math.pow(start-pos, 2)
    const endGap = Math.pow(end-pos, 2)
    const min = Math.min(startGap, endGap)
    const onTop = (min == startGap)

    func({ index: pos, align: align || (onTop ? 'start' : 'end') })
}