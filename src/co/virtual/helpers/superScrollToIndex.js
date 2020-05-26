export default (func, start, end, pos)=>{
    if (!func)
        return
        
    if (pos < end && pos > start)
        return

    const startGap = Math.pow(start-pos, 2)
    const endGap = Math.pow(end-pos, 2)
    const min = Math.min(startGap, endGap)
    const onTop = (min == startGap)

    func({ index: onTop ? pos : pos+1, align: onTop ? 'start' : 'end' })
}