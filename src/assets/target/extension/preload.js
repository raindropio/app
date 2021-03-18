if (location.search.includes('browser_action')){
    function preloadLink(href) {
        let preload = document.createElement('link')
        preload.href = href
        preload.rel = 'preload'
        preload.as = 'fetch'
        preload.type = 'application/json'
        preload.setAttribute('crossorigin', 'use-credentials')
        
        document.head.appendChild(preload)
    }

    (window.browser || window.chrome).tabs.query({ active: true, currentWindow: true }, (tabs=[])=>{
        if (!tabs.length) return
        const tab = tabs[0]
        const { url } = tab

        preloadLink(`https://api.raindrop.io/v1/import/url/exists?url=${encodeURIComponent(url)}`)
        preloadLink(`https://api.raindrop.io/v1/import/url/parse?url=${encodeURIComponent(url)}`)

        window._preloadedTab = tab
    })
}