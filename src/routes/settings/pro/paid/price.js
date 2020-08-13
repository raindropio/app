import s from './price.module.styl'
import React from 'react'
import t from '~t'
import { Label } from '~co/common/form'

export default function ProPrice({ subscription: { price } }) {
    if (!price)
        return null

    return (
        <>
            <Label>{t.s('price')}</Label>
            <div className={s.price}>
                {price.beautiful}
            </div>
        </>
    )
}