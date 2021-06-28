/*
    Set correct width/height for extension browser action popover
    It restored on next open
*/
if (location.search.includes('browser_action')){
    var _lastSavedWidth
    var _bodyStyle

    function setBodyStyle(cssText) {
        if (!_bodyStyle){
            _bodyStyle = document.createElement('style')
            document.head.appendChild(_bodyStyle)
        }

        _bodyStyle.innerHTML=`body {${cssText}}`
    }

    function updateSize({ width='420px', height='auto' }) {
        //browser type
        var browserType = 'unknown'
        if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase()))
            browserType = 'chrome'
        else if (/safari/i.test(navigator.userAgent.toLowerCase()))
            browserType = 'safari'

        if (location.hash.startsWith('#/my') ||
            location.hash.startsWith('#/settings')){
            width = '750px'
            height = '600px'
        }

        setBodyStyle(`width: ${width} !important; height: ${height}  !important`)

        //when browser have global zoom setting, actual max width of popover can be alot smaller, 
        //it's bug of chrome browsers. this is the fix:
        if (browserType=='chrome')
            if (document.documentElement.offsetWidth < parseInt(width) ||
                document.documentElement.offsetHeight < parseInt(height)){
                width = document.documentElement.offsetWidth+'px'
                height = document.documentElement.offsetHeight+'px'

                setBodyStyle(`width: ${width} !important; height: ${height} !important`)
            }

        saveSize(width)
    }

    function saveSize(width) {
        if (!window.localStorage) return
        
        if (width == _lastSavedWidth) return
        _lastSavedWidth = width

        setTimeout(() => {
            window.localStorage.setItem('window-width', window.innerWidth)
            window.localStorage.setItem('window-height', window.innerHeight)
        }, 100)
    }

    function restoreSize() {
        if (!window.localStorage) return

        const width = parseInt(window.localStorage.getItem('window-width'))||0
        const height = parseInt(window.localStorage.getItem('window-height'))||0

        _lastSavedWidth = width

        updateSize(width && height ? { width: width+'px', height: height+'px' } : {})
    }

    window.onhashchange = function() {
        updateSize({})
    }
    window.onbeforeunload = function() {
        saveSize()
    }

    //restore old size
    restoreSize()

    //reset size for html
    document.documentElement.style.width = 'auto'
    document.documentElement.style.height = 'auto'
}