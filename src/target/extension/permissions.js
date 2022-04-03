import browser from './browser'
import { environment } from './environment'

const permissions = {
    async contains(permission, strict=true) {
        //safari always require strict `tabs` permission
        if (environment.includes('safari'))
            strict = true

        return browser.permissions.contains({
            permissions: [permission],

            //full access. required for highlights. Safari doesn't work properly without origins
            ...(permission == 'tabs' && strict ? {
                origins: ['http://a.com/']
            } : {})
        })
    },

    async request(permission) {
        if (permission == 'tabs') {
            await browser.permissions.request({
                permissions: [permission],
                origins: ['<all_urls>']
            })

            //force to show permission request dialog in safari
            if (environment.includes('safari')) {
                alert('Make sure ALL WEBSITES access is enabled!')
                await browser.tabs.query({currentWindow: true})
            }

            return permissions.contains(permission)
        }

        return browser.permissions.request({
            permissions: [permission]
        })
    },

    async remove(permission) {
        return browser.permissions.remove({
            permissions: [permission],

            //remove origins only in safari! in other browser will break api access to raindrop
            ...(permission == 'tabs' && environment.includes('safari') ? {
                origins: ['<all_urls>']
            } : {})
        })
    }
}

//clean up if user doesn't give a full access tabs
//otherwise user will be asked for permission each time he click on browser_action button
if (environment.includes('safari'))
    permissions.contains('tabs')
        .then(have=>{
            if (!have)
                return permissions.remove('tabs')
        })
        .catch(console.log)

export { permissions }