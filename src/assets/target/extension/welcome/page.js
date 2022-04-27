window.onload = ()=>{
    if (navigator.userAgent.toLowerCase().includes('mac os'))
        document.documentElement.classList.add('mac')

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
    window.addEventListener('resize', setActiveNav)
}