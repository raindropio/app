/*
    Set correct width/height for extension browser action popover
    It restored on next open
*/
if (location.search.includes('browser_action')){
    var _lastSavedWidth

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
            height = `${browserType=='safari' ? 530 : 600}px` //safari have bug with height >530px
        }

        document.body.style.width = width
        document.body.style.height = height

        //when browser have global zoom setting, actual max width of popover can be alot smaller, 
        //it's bug of chrome browsers. this is the fix:
        if (browserType=='chrome')
            if (document.documentElement.offsetWidth < parseInt(width) ||
                document.documentElement.offsetHeight < parseInt(height)){
                width = document.documentElement.offsetWidth+'px'
                height = document.documentElement.offsetHeight+'px'

                document.body.style.width = width
                document.body.style.height = height
            }

        saveSize(width)
    }

    function saveSize(width) {
        if (width == _lastSavedWidth) return
        _lastSavedWidth = width

        setTimeout(() => {
            localStorage.setItem('window-width', window.innerWidth)
            localStorage.setItem('window-height', window.innerHeight)
        }, 100)
    }

    function restoreSize() {
        const width = parseInt(localStorage.getItem('window-width'))||0
        const height = parseInt(localStorage.getItem('window-height'))||0

        _lastSavedWidth = width

        updateSize(width && height ? { width: width+'px', height: height+'px' } : {})
    }

    window.onhashchange = function() {
        updateSize({})
    }

    //restore old size
    restoreSize()

    //reset size for html
    document.documentElement.style.width = 'auto'
    document.documentElement.style.height = 'auto'
}