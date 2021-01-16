//react to frame body resize
const onFrameResize = ([{ contentRect: { width, height } }])=>{
    if (!width && !height)
        return

    if (document.body.style.width == width &&
        document.body.style.height == height)
        return

    document.body.style.width = width
    document.body.style.height = height

    localStorage.setItem('safari-browser-action-window-width', width)
    localStorage.setItem('safari-browser-action-window-height', height)
}

const frameResize = new ResizeObserver(onFrameResize)

const frame = document.getElementById('frame')

frame.addEventListener('load', () => {
    frameResize.observe(frame.contentWindow.document.body)
})

//restore cached w/h
onFrameResize([{ contentRect: {
    width: localStorage.getItem('safari-browser-action-window-width'), 
    height: localStorage.getItem('safari-browser-action-window-height') 
}}])