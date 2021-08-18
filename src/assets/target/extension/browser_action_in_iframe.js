//react to frame body resize
const onFrameResize = ([{ contentRect: { width, height } }])=>{
    if (!width && !height)
        return

    if (document.body.style.width == width &&
        document.body.style.height == height)
        return

    document.body.style.width = width
    document.body.style.height = height

    try{
        localStorage.setItem('browser-action-in-iframe-window-width', width)
        localStorage.setItem('browser-action-in-iframe-window-height', height)
    } catch(e) {
        console.log(e)
    }
}

const frameResize = ('ResizeObserver' in window) ? new ResizeObserver(onFrameResize) : null

const frame = document.getElementById('frame')

frame.addEventListener('load', () => {
    frame.style.opacity = 1

    if (frameResize)
        frameResize.observe(frame.contentWindow.document.body)

    //override close in frame
    frame.contentWindow.close = ()=>{
        try{
            //safari doesn't close window for some reason, so focus current tab
            browser.windows.getCurrent().then(w=>
                browser.windows.update(w.id, { focused: true })
            )
            
            window.close()
        }catch(e){}
    }
})

//restore cached w/h
let restored
try{
    restored = {
        width: localStorage.getItem('browser-action-in-iframe-window-width'), 
        height: localStorage.getItem('browser-action-in-iframe-window-height') 
    }
} catch(e) {
    console.log(e)
}

if (restored)
    onFrameResize([{ contentRect: restored}])