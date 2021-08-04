import { useMemo } from 'react'

export default function AddRouteEvents() {
    //close window on Esc press (when possible) 
    useMemo(()=>{
        function onWindowKeyDown({ key }) {
            switch(key) {
                case 'Escape':
                    if (window.dispatchEvent(new Event('beforeunload', { cancelable: true })))
                        window.close()
                break
            }
        }

        window.addEventListener('keydown', onWindowKeyDown)
        return ()=>window.removeEventListener('keydown', onWindowKeyDown)
    }, [])

    return null    
}