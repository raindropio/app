import s from './howto.module.styl'
import t from '~t'
import React, { useState, useEffect } from 'react'
import { hotkeys, environment } from '~target'
import links from '~config/links'

import safariIosScreenshot from './assets/safari-ios.png'
import Icon from '~co/common/icon'
import Button from '~co/common/button'

export default function ExtensionHighlightsEmptyHowTo() {
    const [shortcut, setShortcut] = useState('')
    useEffect(()=>{
        async function getHotkey() {
            const command = await hotkeys.getByName('save_page')
            if (command)
                setShortcut(command.shortcut)
        }
        getHotkey()
    }, [])

    return (
        <div className={s.empty}>
            <Icon name='highlights' enlarge='2' />

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
        </div>
    )
}