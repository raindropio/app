import s from './ask.module.styl'
import React from 'react'
import Stella from '~co/stella'

export default function PageMyItemTabAsk({ item }) {
    return (
        <Stella
            raindropId={item._id}
            className={s.embed}
        />
    )
}