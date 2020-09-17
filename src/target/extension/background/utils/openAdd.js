import browser from 'webextension-polyfill'

export function openAdd(props) {
    const width = 450;
    const height = 600;
    const left = (screen.width/2)-(width/2);
    const top = (screen.height/2)-(height/2); 

    browser.windows.create({
        type: 'popup',
        url: `index.html#/add?${new URLSearchParams(props).toString()}`,
        width,
        height,
        left,
        top
    })
}