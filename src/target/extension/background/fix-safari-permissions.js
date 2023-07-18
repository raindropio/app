/*
    Sometime Safari start asking 'tabs' permission all the time, even when it not required.
    Users don't have option to just Deny it. This logic prevents such cases
*/

import browser from 'webextension-polyfill'
import { environment } from '~target'

/*
    This fix only applicable when 'tabs' and 'origins' permissions are declared as optional in manifest!
    Unfortunately declaring them as required in manifest, doesnt fix the problem of asked permissions
    Make sure, that each time Safari is restarted optional permissions are revoked
*/
async function fix() {
    if (await browser.permissions.contains({
        permissions: ['tabs'],
        origins: ['http://a.com/']
    }))
        return
        
    await browser.permissions.remove({
        permissions: ['tabs'],
        origins: ['*://*/*']
    })
}

export default function () {
    if (!environment.includes('safari')) return
    if (environment.includes('safari-ios')) return //ios is okay, no need a fix

    fix().catch(console.error)

    browser.tabs.onActivated.removeListener(fix)
    browser.tabs.onActivated.addListener(fix)
    browser.tabs.onUpdated.removeListener(fix)
    browser.tabs.onUpdated.addListener(fix)
}