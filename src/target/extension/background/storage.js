import browser from 'webextension-polyfill'

async function cleanWhenNoSpaceLeft() {
    const used = await browser.storage.local.getBytesInUse()
    const max = browser.storage.local.QUOTA_BYTES

    if (max < (used + 1000000)){
        console.log('Clear local storage, not enough size left')
        await browser.storage.local.clear()
    }
}

export default function() {
    if (!('storage' in browser)) return
    if (!('local' in browser.storage)) return

    cleanWhenNoSpaceLeft().catch(console.log)
}