var browser = [];

if (typeof navigator != 'undefined'){
    if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase()))
        browser.push('chrome')

    if (navigator.userAgent.toLowerCase().includes('safari')
        && !navigator.userAgent.toLowerCase().includes('chrome'))
        browser.push('safari')

    if (navigator.userAgent.match(/firefox/i))
        browser.push('firefox')

    //OS
    if (navigator.appVersion.indexOf('Win')!=-1) browser.push('win')
    if (navigator.appVersion.indexOf('Mac')!=-1) browser.push('mac')
    if (navigator.appVersion.indexOf('X11')!=-1 ||
        navigator.appVersion.indexOf('Linux')!=-1) browser.push('linux')

    //Device
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
        browser.push('mobile')
}

export const environment = browser