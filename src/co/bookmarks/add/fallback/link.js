import s from './link.module.css'
import React, { useCallback, useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import t from '~t'
import { manyCreate, manyReparseInplace } from '~data/actions/bookmarks'
import { extractURLs } from '~modules/format/url'

import { Error } from '~co/overlay/dialog'
import Popover from '~co/overlay/popover'
import { Layout, Text, Label, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

function AddForm({ spaceId, onEdit, pin, onClose }) {
    const dispatch = useDispatch()

    const input = useRef(null)
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

    //grab link from clipboard
    useEffect(()=>{
        (async()=>{
            //in safari readText works bad, so this line prevents run on safari
            await navigator.permissions.query({name: 'clipboard-read'})
            return extractURLs(await navigator.clipboard.readText())
        })()
            .then(urls=>{
                setText(urls.join('\n'))
                input.current?.select?.()
            })
            .catch(e=>console.error(e))
    }, [setText, input])

    const onChangeInput = useCallback(e=>{
        e.currentTarget?.setCustomValidity('')
        setText(e.currentTarget.value)
    }, [setText])

    const onSubmitForm = useCallback(e=>{
        e.preventDefault()
        e.stopPropagation()

        const urls = extractURLs(text)
        input.current?.setCustomValidity?.(urls.length ? '' : 'Please enter a valid URL(s)')
        input.current?.reportValidity?.()

        if (urls.length) {
            setLoading(true)

            dispatch(
                manyCreate(
                    urls.map(link=>({
                        link,
                        collectionId: parseInt(spaceId)||-1
                    })),
                    (items)=>{
                        dispatch(manyReparseInplace(items))
                        onClose()
                    }, e=>{
                        Error(e)
                        setLoading(false)
                    }
                )
            )
        }
    }, [text, input, spaceId, dispatch, setLoading])

    return (
        <Popover
            pin={pin}
            closable={true}
            className={s.modal}
            onClose={onClose}>
            <form onSubmit={onSubmitForm}>
                <Layout>
                    <Label>URL</Label>
                    <Text
                        ref={input}
                        disabled={loading}
                        autoSize={true}
                        type='text'
                        autoComplete='off'
                        spellCheck='false'
                        autoFocus={true}
                        maxRows={10}
                        value={text}
                        placeholder='https://'
                        onChange={onChangeInput} />

                    <Buttons>
                        <Button
                            variant='outline'
                            onClick={onClose}>
                            {t.s('cancel')}
                        </Button>

                        <Button
                            as='input'
                            type='submit'
                            variant='primary'
                            disabled={loading} />
                    </Buttons>
                </Layout>
            </form>
        </Popover>
    )
}

export default function BookmarksAddFallbackLink({ spaceId, autoFocus, onEdit }) {
    const [show, setShow] = useState(false)
    const button = useRef(null)

    return (
        <>
            <Button 
                ref={button}
                variant='primary'
                title={t.s('addBookmark')}
                autoFocus={autoFocus}
                onClick={()=>setShow(true)}>
                <Icon name='add' />
                <span className='hide-on-small-body'>{t.s('add')}</span>
            </Button>

            {show && (
                <AddForm 
                    spaceId={spaceId} 
                    onEdit={onEdit}
                    pin={button}
                    onClose={()=>setShow(false)} />
            )}
        </>
    )
}