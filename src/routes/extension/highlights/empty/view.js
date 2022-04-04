import s from './view.module.styl'
import t from '~t'
import React, { useState, useEffect, useCallback } from 'react'
import { hotkeys, environment, permissions } from '~target'
import links from '~config/links'

import safariIosScreenshot from './assets/safari-ios.png'
import Icon from '~co/common/icon'
import Button from '~co/common/button'

export default function ExtensionHighlightsEmpty() {
    //permissions
    const [allowed, setAllowed] = useState(false)
    useEffect(()=>{ permissions.contains('tabs').then(setAllowed) }, [])

    const requestPermission = useCallback((e)=>{
        e.preventDefault()
        permissions.request('tabs').then(setAllowed)
    }, [])

    const needPermissions = (<>
        <p>
            <b>Additional permission required to use Highlights</b>
        </p>

        <Button
            onClick={requestPermission}
            variant='primary'>
            {t.s('continue')}
        </Button>

        <Button
            href={links.help.highlights.addExtension}
            target='_blank'
            variant='link'>
            {t.s('help')}
        </Button>
    </>)

    //howto
    const [shortcut, setShortcut] = useState('')
    useEffect(()=>{
        async function getHotkey() {
            const command = await hotkeys.getByName('save_highlight')
            if (command)
                setShortcut(command.shortcut)
        }
        getHotkey()
    }, [])

    const howto = (<>
        <p>
            {environment.includes('safari-ios') ? (<>
                <b>Select text</b> on a web-page and <b>tap color</b> to save highlight and/or add annotations.
                <br /><br />

                <img 
                    className={s.screenshot}
                    src={safariIosScreenshot} 
                    alt='' 
                    style={{maxHeight: 180}} />
            </>) : (<>
                <b>Select text</b> on a web-page
                {shortcut ? <> and press <b>{shortcut}</b><br/>or </> : <> and </>}
                click <b>Save highlight</b> from context menu.
            </>)}
        </p>

        <Button
            href={links.help.highlights.addExtension}
            target='_blank'
            variant='primary'>
            <Icon name='open' size='micro' />
            {t.s('help')}
        </Button>
    </>)

    return (
        <div className={s.empty}>
            <Icon name='highlights' enlarge='2' />

            {allowed ? howto : needPermissions}
        </div>
    )
}