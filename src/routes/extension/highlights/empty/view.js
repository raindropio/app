import s from './view.module.styl'
import t from '~t'
import React, { useState, useEffect } from 'react'
import { hotkeys } from '~target'
import links from '~config/links'

import Icon from '~co/common/icon'
import Button from '~co/common/button'

export default function ExtensionHighlightsEmpty() {
    const [shortcut, setShortcut] = useState('')
    useEffect(()=>{
        async function getHotkey() {
            const command = await hotkeys.getByName('save_highlight')
            if (command)
                setShortcut(command.shortcut)
        }
        getHotkey()
    }, [])

    return (
        <div className={s.empty}>
            <Icon name='highlights' enlarge='2' />

            <p>
                <b>Select text</b> on a web-page
                {shortcut ? <> and press <b>{shortcut}</b><br/>or </> : <> and </>}
                click <b>Save highlight</b> from context menu
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