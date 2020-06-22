import s from './clients.module.styl'
import React from 'react'
import t from '~t'
import Client from './client'

export default function Clients({ items }) {
    if (!items.length)
        return (
            <div className={s.clients}>
                <div className={s.notFound}>
                    👻 {t.s('nothingFound')}
                </div>
            </div>
        )

    return (
        <div className={s.clients}>
            {items.map(item=>
                <Client key={item._id} {...item} />
            )}
        </div>
    )
}