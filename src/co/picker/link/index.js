import styles from './index.module.styl'
import React, { useState, useCallback, useEffect } from 'react'
import t from '~t'
import { normalizeURL } from '~modules/format/url'
import isURL from 'validator/es/lib/isURL'

import Popover from '~co/overlay/popover'
import { Layout, Label, Text, Buttons } from '~co/common/form'
import { Alert } from '~co/overlay/dialog'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'

export default function OverlayLink({ onLink, buttons, ...etc }) {
    const [link, setLink] = useState('')
    const [status, setStatus] = useState('')

    //events
    const onChange = useCallback(e=>setLink(e.target.value), [])
    const onSubmit = useCallback(e=>{
        e.preventDefault()
        e.stopPropagation()

        async function now() {
            setStatus('loading')
            await onLink(normalizeURL(link, { defaultProtocol: 'https:' }))
            etc.onClose()
        }

        now().catch(e=>{
            setStatus('error')

            return Alert(`${t.s('saveError')}\n${e.message}`)
        })
    }, [link, onLink, etc.onClose])

    //on load
    useEffect(()=>{
        async function load() {
            //in safari readText works bad, so this line prevents run on safari
            try{
                await navigator.permissions.query({name: 'clipboard-read'})
            }catch(e) {
                return false
            }

            let text = ''
            try{
                text = await navigator.clipboard.readText()
            }catch(e){}

            if (isURL(text, { require_protocol: true }))
                setLink(text)
        }

        load()
    }, [])

    return (
        <Popover
            className={styles.popover}
            closable={status!='loading'}
            {...etc}>
            <form onSubmit={onSubmit}>
                <Layout>
                    <Label>URL</Label>

                    <Text
                        type='url'
                        inputMode='url'
                        required
                        className='field'
                        placeholder='https://'
                        value={link}
                        disabled={status=='loading'}
                        onChange={onChange}
                        autoFocus
                        selectAll />

                    <Buttons variant='between'>
                        {buttons}

                        {status == 'loading' ? (
                            <Button 
                                disabled 
                                data-block
                                variant='flat'>
                                <Preloader />
                            </Button>
                        ) : (
                            <Button
                                data-block
                                as='input'
                                type='submit'
                                variant='primary'
                                disabled={!link}
                                value={t.s('save')} />
                        )}
                    </Buttons>
                </Layout>
            </form>
        </Popover>
    )
}