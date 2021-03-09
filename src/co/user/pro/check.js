import t from '~t'
import isPro from '~data/modules/user/isPro'
import { Confirm } from '~co/overlay/dialog'
import config from '~config'
import { target, environment } from '~target'

export default async function Check(type='') {
    if (isPro()) return true

    const safariEx = (target == 'extension' && environment.includes('safari'))
    let go = false

    switch(type) {
        case 'nested':
            go = await Confirm(
                t.s('nestedCollections'),
                {
                    description: t.s('onlyInPro'),
                    ok: !safariEx ? t.s('upgradeToPro') : 'OK'
                }
            )
        break
    }

    if (safariEx)
        return false

    if (go)
        window.open(config.links.pro.buy)

    return false
}