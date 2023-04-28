import s from './index.module.styl'
import React, { useEffect } from 'react'
import t from '~t'
import config from '~config'
import { target } from '~target'
import Button from '~co/common/button'

function Extension() {
    useEffect(()=>{
        window.open(new URL('/account/extension', config.links.app.index).href)
        window.close()
    }, [])

    return null
}

function Web() {
    return (
        <div className={s.page}>
            <p>
                Click <b>Raindrop.io extension</b> icon to get started
            </p>

            <Button 
                variant='outline'
                onClick={()=>window.close()}>
                {t.s('close')}
            </Button>
        </div>
    )
}

export default target == 'extension' ? Extension : Web