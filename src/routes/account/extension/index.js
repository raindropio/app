import s from './index.module.styl'
import React, { useEffect } from 'react'
import t from '~t'
import config from '~config'
import { target } from '~target'

import { Layout, Title } from '~co/common/form'
import Button from '~co/common/button'

function Extension() {
    const href = new URL('/account/extension', config.links.app.index).href

    useEffect(()=>{
        window.open(href)
        window.close()
    }, [])

    return (
        <Layout>
            <Title className={s.center}>{t.s('startToSave')}</Title>
            <div />

            <Button 
                href={href}
                target='_blank'
                variant='primary'
                data-block
                autoFocus>
                {t.s('signIn')}
            </Button>
        </Layout>
    )
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