import browser from 'webextension-polyfill'

async function onClicked({ menuItemId, pageUrl, srcUrl, linkUrl, linkText, selectionText }) {
    switch(menuItemId) {
        case 'savePage':{
            let title

            try{
                const [ tab ] = await browser.tabs.query({ active: true })
                title = tab.title
            } catch(e) {}
            
            return Add({ link: pageUrl, title })
        }

        case 'saveLink':
            return Add({ link: linkUrl, title: linkText||selectionText })

        case 'saveVideo':
            return Add({ link: srcUrl })

        case 'saveImage':
            return Add({ link: srcUrl })
    }
}

function Add(props) {
    const width = 400;
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

export default async function() {
    //remove all to be sure
    try{
        await browser.contextMenus.removeAll()
    } catch (e) {}

    //create
    await Promise.all([
        browser.contextMenus.create({
            id: 'savePage',
            title: 'Save page',
            contexts: ['page']
        }),
        browser.contextMenus.create({
            id: 'saveLink',
            title: 'Save link',
            contexts: ['link']
        }),
        browser.contextMenus.create({
            id: 'saveVideo',
            title: 'Save video',
            contexts: ['video']
        }),
        browser.contextMenus.create({
            id: 'saveImage',
            title: 'Save image',
            contexts: ['image']
        })
    ])

    //event
    browser.contextMenus.onClicked.addListener(onClicked)      
}