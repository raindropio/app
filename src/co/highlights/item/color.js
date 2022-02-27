import s from './color.module.styl'
import React from 'react'
import Button from '~co/common/button'
import { IconWrap } from '~co/common/icon'

const colors = ['yellow', 'blue', 'green', 'red']

export default function HighlightsItemColor({ color, onChange }) {
    return (
        <div className={s.colors}>
            {colors.map(c=>(
                <Button
                    key={c}
                    data-active={c == color || (!color && c=='yellow')}
                    onClick={()=>onChange({ color: c })}>
                    <IconWrap 
                        className={s.color} 
                        style={{'--color': c}} />
                </Button>
            ))}
        </div>
    )
}