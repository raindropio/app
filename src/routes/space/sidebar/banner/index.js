import s from './index.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'
import { connect } from 'react-redux'
import { isPro } from '~data/selectors/user'

import Icon from '~co/common/icon'

function ProBanner({ isPro }) {
    if (isPro) return null
    
    return (
        <a href={config.links.pro.buy} target='_blank' className={s.banner}>
            <span className={s.title}>
                <b>{t.s('proGreeting')}</b><br/>
                {t.s('upgradeToPro')}
            </span>

            <Icon className={s.icon} name='diamond_active' />
        </a>
    )
}

export default connect(
	(state)=>({
        isPro: isPro(state)
	})
)(ProBanner)