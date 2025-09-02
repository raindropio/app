import { useMemo } from 'react'
import browser from '~target/extension/browser'
import { environment } from '~target'

export default function useCloseSidepanel() {
    if (!environment.includes('sidepanel'))
        return
    
    useMemo(()=>{
        function onMessage(message) {
            if (message === 'closeSidePanel')
                window.close()
        }

        browser.runtime.onMessage.addListener(onMessage)
        return ()=>browser.runtime.onMessage.removeListener(onMessage)
    }, [])
}