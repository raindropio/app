//react to frame body resize
const onFrameResize = ([{ contentRect: { width, height } }])=>{
    if (!width && !height)
        return

    if (document.body.style.width == width &&
        document.body.style.height == height)
        return

    document.body.style.width = width
    document.body.style.height = height

    localStorage.setItem('browser-action-in-iframe-window-width', width)
    localStorage.setItem('browser-action-in-iframe-window-height', height)
}

const frameResize = new ResizeObserver(onFrameResize)

const frame = document.getElementById('frame')

frame.addEventListener('load', () => {
    frameResize.observe(frame.contentWindow.document.body)
})

//restore cached w/h
onFrameResize([{ contentRect: {
    width: localStorage.getItem('browser-action-in-iframe-window-width'), 
    height: localStorage.getItem('browser-action-in-iframe-window-height') 
}}])