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
onFrameResize([{ contentRect: {
    width: localStorage.getItem('browser-action-in-iframe-window-width'), 
    height: localStorage.getItem('browser-action-in-iframe-window-height') 
}}])