import React from 'react'
import t from '~t'
import Client from './client'

export default function Clients({ items }) {
    if (!items.length)
        return (
            <div className='clients'>
                <div className='not-found'>
                    👻 {t.s('nothingFound')}
                </div>
            </div>
        )

    return (
        <div className='clients'>
            {items.map(item=>
                <Client key={item._id} {...item} />
            )}
        </div>
    )
}