import s from './index.module.styl'
import React from 'react'
import t from '~t'
import _ from 'lodash'
import config from '~config'
import { connect } from 'react-redux'
import { isPro } from '~data/selectors/user'

import Pic from './pic.svg?component'

function Upgrade({ isPro }) {
    if (isPro) return null

    let message = t.s('proGreeting')
    if (_.random(0,1)==1)
        message = `${t.s('fullTextSearch')}, ${t.s('nestedCollections').toLowerCase()}, ${t.s('suggested').toLowerCase()} ${t.s('tags').toLowerCase()} ${t.s('und')} ${t.s('more').toLowerCase()}…`
    
    return (
        <a href={config.links.pro.buy} target='_blank' className={s.upgrade}>
            <span className={s.title}>
                <b>{message}</b><br/>
                {t.s('upgradeToPro')}
            </span>

            <Pic className={s.pic} />
        </a>
    )
}

export default connect(
	(state)=>({
        isPro: isPro(state)
	})
)(Upgrade)