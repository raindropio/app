//react to frame body resize
const onFrameResize = ([{ contentRect: { width, height } }])=>{
    if (!width && !height)
        return

    if (document.body.style.width == width &&
        document.body.style.height == height)
        return

    document.body.style.width = width
    document.body.style.height = height

    if (window.localStorage) {
        window.localStorage.setItem('browser-action-in-iframe-window-width', width)
        window.localStorage.setItem('browser-action-in-iframe-window-height', height)
    }
}

const frameResize = ('ResizeObserver' in window) ? new ResizeObserver(onFrameResize) : null

const frame = document.getElementById('frame')

frame.addEventListener('load', () => {
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
if (window.localStorage)
    onFrameResize([{ contentRect: {
        width: window.localStorage.getItem('browser-action-in-iframe-window-width'), 
        height: window.localStorage.getItem('browser-action-in-iframe-window-height') 
    }}])

//prevent background flicker in firefox
if (window.browser && window.browser.theme)
    browser.theme.getCurrent().then(({colors})=>{
        document.body.style.background = colors.popup
    })