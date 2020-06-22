import s from './bg.module.styl'
import React from 'react'
import Icon from '~co/common/icon'

export default function Bg() {
    return (
        <div>
            <Icon name='diamond' className={s.floatingIcon} />
            <Icon name='default_collection' className={s.floatingIcon} />
            <Icon name='video' className={s.floatingIcon} />
            <div className={s.dots}><span/><span/><span/><span/><span/><span/></div>
        </div>
    )
}