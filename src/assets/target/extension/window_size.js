/*
    Set correct width/height for extension browser action popover
    It restored on next open
*/
if (location.search.includes('browser_action')){
    var container, _lastSavedWidth

    function updateSize({ width='420px', height='auto' }) {
        if (location.hash.startsWith('#/my') ||
            location.hash.startsWith('#/settings')){
            width = '750px'
            height = '600px' //safari have bug with height >440px
        }

        container.style.width = width
        container.style.height = height

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
    container = document.querySelector('#react')
    restoreSize()

    //reset size for html/body
    document.documentElement.style.width = 'auto'
    document.documentElement.style.height = 'auto'
    document.body.style.width = 'auto'
    document.body.style.height = 'auto'
}