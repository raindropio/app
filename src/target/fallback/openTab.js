import { environment } from './environment'

export function openTab(links) {
    const arr = Array.isArray(links)?links:[links]

    //firefox opens tabs in reverse order
    if (environment.includes('firefox'))
        arr.reverse()

    for(const link of arr)
        if (!link.startsWith('file'))
            window.open(link)
}