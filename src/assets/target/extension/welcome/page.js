window.onload = ()=>{
    //environment
    if (navigator.userAgent.toLowerCase().includes('mac os'))
        document.documentElement.classList.add('mac')

    //navigation
    const nav = document.querySelector('nav')
    const sections = document.querySelectorAll('section')

    const links = []
    for(const section of sections) {
        const link = document.createElement('a')
        link.href = `#${section.id}`
        links.push(link)
        nav.appendChild(link)
    }

    let active = -1
    function setActiveNav() {
        let newActive = parseInt(document.documentElement.scrollTop / document.documentElement.clientHeight)
        if (newActive != active) {
            active = newActive
            
            for(const i in links)
                if (i == active)
                    links[i].classList.add('active')
                else
                    links[i].classList.remove('active')
        }
    }

    setActiveNav()
    window.addEventListener('scroll', setActiveNav)
    window.addEventListener('resize', setActiveNav);

    //hotkey
    ('chrome' in window ? window.chrome : window.browser).commands.getAll(commands=>{
        const { shortcut } = commands.find(({name})=>name=='save_page')
        if (shortcut)
            document.querySelector('#save-hotkey').textContent = shortcut
        else
            document.querySelector('#save-hotkey').innerHTML = '<a href="https://help.raindrop.io/browser-extension#change-hotkey" target="_blank">Set hotkey</a>'
    })
}