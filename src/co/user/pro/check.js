import t from '~t'
import isPro from '~data/modules/user/isPro'
import { Confirm } from '~co/overlay/dialog'
import config from '~config'

export default async function Check(type='') {
    if (isPro()) return true

    let go = false

    switch(type) {
        case 'annotations':
            go = await Confirm(
                t.s('add') + ' ' + t.s('note').toLowerCase(),
                {
                    id: `pro-check-${type}`,
                    description: t.s('onlyInPro'),
                    ok: t.s('upgradeToPro')
                }
            )
        break

        case 'reminders':
            go = await Confirm(
                t.s('add') + ' ' + t.s('reminder').toLowerCase(),
                {
                    id: `pro-check-${type}`,
                    description: t.s('onlyInPro'),
                    ok: t.s('upgradeToPro')
                }
            )
        break
    }

    if (go)
        window.open(config.links.pro.buy)

    return false
}