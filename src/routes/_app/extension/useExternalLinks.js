import { useMemo } from 'react'
import browser from '~target/extension/browser'

export default function useExternalLinks() {
    useMemo(()=>{
        function onClickExternalLink(e) {
            if (e.defaultPrevented) return

            //ignore non links
            const { target: a } = e
            if (a.tagName != 'A') return
            
            //ignore empty or target blank
            const { href='', target } = a
            if (!href || target=='_blank') return

            //ignore own link
            let host, protocol
            try{
                const parsed = new URL(href)
                host = parsed.host
                protocol = parsed.protocol
            } catch(e) {}
            if (host == location.host && protocol == location.protocol) return

            //update current tab
            e.preventDefault()
            e.stopPropagation()
            browser.tabs.update({ url: href })
            
            window.close()
        }

        //very important to bind to window insted of document, to be sure that it happen after all other event listeners
        window.addEventListener('click', onClickExternalLink)
        return ()=>window.removeEventListener('click', onClickExternalLink)
    }, [])
}