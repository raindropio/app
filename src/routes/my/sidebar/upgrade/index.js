import s from './index.module.styl'
import React, { useMemo, useState, useCallback } from 'react'
import t from '~t'
import _ from 'lodash'
import config from '~config'
import { useSelector } from 'react-redux'
import { isPro } from '~data/selectors/user'

import Pic from './pic.svg?component'
import UserUpgrade from '~co/user/upgrade'

export default function Upgrade() {
    const [show, setShow] = useState(false)
    const onShowClick = useCallback((e)=>{
        e.preventDefault()
        setShow(true)
    }, [setShow])

    const pro = useSelector(isPro)

    let message = useMemo(()=>{
        if (_.random(0,1)==1)
            return `${t.s('fullTextSearch')}, ${t.s('permanentCopy').toLowerCase()}, ${t.s('backups').toLowerCase()} ${t.s('und')} ${t.s('more').toLowerCase()}…`
        return t.s('proGreeting')
    }, [])
    
    if (pro) return null

    return (
        <>
            <a
                href={config.links.pro.buy}
                onClick={onShowClick}
                className={s.upgrade}>
                <span className={s.title}>
                    <span className={s.headline}>{message}</span>
                    {t.s('upgradeToPro')}
                </span>

                <Pic className={s.pic} />
            </a>

            {show ? <UserUpgrade onClose={()=>setShow(false)} /> : null}
        </>
    )
}