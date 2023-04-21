import s from './index.module.styl'
import React from 'react'
import t from '~t'
import Screen from '~co/screen/basic'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default ()=>{
    return (
        <Screen appSize='large' className={s.page}>
            <Icon className={s.icon} name='check' enlarge='3' />

            <p>
                Click <b>Raindrop.io extension</b> icon to get started
            </p>

            <Button 
                variant='outline'
                onClick={()=>window.close()}>
                {t.s('close')}
            </Button>
        </Screen>
    )
}