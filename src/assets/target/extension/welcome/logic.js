function debounce(func, wait, immediate) {
    let timeout
    return function executedFunction() {
        const later = ()=>{
            timeout = null
            if (!immediate) func.apply(this, arguments)
        }

        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(this, arguments)
    }
}

function detectSystem() {
    if (navigator.appVersion.indexOf('Win')!=-1) return 'windows'
    if (navigator.appVersion.indexOf('Mac')!=-1) return 'macos'
    if (navigator.appVersion.indexOf('X11')!=-1 ||
        navigator.appVersion.indexOf('Linux')!=-1) return 'linux'
    return ''
}

function detectBrowser(){ 
    let userAgent = navigator.userAgent;
    
    if ('brave' in navigator)
        return 'brave'
    if(userAgent.match(/firefox|fxios/i))
        return 'firefox'
    else if(userAgent.match(/opr\//i))
        return 'opera'
    else if(userAgent.match(/edg/i))
        return 'edge'
    else if(userAgent.match(/chrome|chromium|crios/i))
        return 'chrome'
    else if(userAgent.match(/safari/i))
        return 'safari'
    
    return ''
}

const scrollByPage = debounce((right)=>{
    window.scrollTo({
        top: 0,
        left: window.scrollX + (window.innerWidth * (right ? 1 : -1)),
        behavior: 'smooth'
    })
}, 300, true)

window.onload = ()=>{
    //browser detection
    document.documentElement.classList.add(detectSystem())
    document.documentElement.classList.add(detectBrowser())
    document.querySelectorAll('.browser-name').forEach(e=>e.innerText=detectBrowser())

    //tabs permission request button
    document.querySelectorAll('.request-tabs-permission').forEach(elem=>
        elem.addEventListener('click', e=>{
            e.preventDefault();
            ('chrome' in window ? window.chrome : window.browser).permissions.request({ permissions: ['tabs'] })
        })
    )

    //update authenticated status class
    async function updateAuthenticatedClass() {
        const res = await fetch('https://api.raindrop.io/v1/user', { credentials: 'include' } )
        const { result } = await res.json()
        if (result) 
            document.documentElement.classList.add('authenticated')
        else
            document.documentElement.classList.remove('authenticated')
    }
    updateAuthenticatedClass().then(()=>{}).catch(console.error)
    window.addEventListener('focus', updateAuthenticatedClass)

    //slides intersection
    const slides = document.querySelectorAll('.slide')

    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            entry.target.style.setProperty('--intersection-ratio', entry.intersectionRatio >= 0.9 ? 1 : entry.intersectionRatio.toFixed(1))
            if (entry.intersectionRatio >= 0.9)
                history.replaceState({}, '', `#${entry.target.id}`)
        })
    }, { rootMargin: '0px', threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] })

    slides.forEach(slide => {
        observer.observe(slide)
    })

    //unhide
    function unHideAnchor() {
        if (location.hash) {
            const anchor = document.querySelector(location.hash)
            if (anchor.hidden){
                anchor.removeAttribute('hidden')
                anchor.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
            }
        }
    }

    window.addEventListener('hashchange', unHideAnchor)
    unHideAnchor()

    //wheel
    document.documentElement.addEventListener('wheel', e=>{
        if (window.innerHeight < document.documentElement.scrollHeight)
            return
        e.preventDefault()
        scrollByPage(e.deltaY >= 0)
    }, { passive: false })

    //nav
    const navLeft = document.querySelector('#nav-left')
    const navRight = document.querySelector('#nav-right')

    navLeft.addEventListener('click', e=>{
        e.preventDefault()
        scrollByPage(false)
    })

    navRight.addEventListener('click', e=>{
        e.preventDefault()
        scrollByPage(true)
    })

    const updateNavVisibility = ()=>{
        navLeft.hidden = window.scrollX <= 0
        navRight.hidden = window.scrollX >= document.documentElement.scrollWidth - window.innerWidth
    }
    updateNavVisibility()
    window.addEventListener('scroll', updateNavVisibility)

    document.querySelector('#decline-uninstall').addEventListener('click', e=>{
        e.preventDefault()
        browser.management.uninstallSelf({ showConfirmDialog: false })
    })
}