import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { oneUpdate } from '~data/actions/collections'
import t from '~t'

import { Layout, Text, Label, Title, Separator, Buttons } from '~co/common/form'
import Button from '~co/common/button'

export default function SharingCustomization({ collection }) {
    const dispatch = useDispatch()

    //form
    const [form, setForm] = useState({})

    useEffect(()=>{
        setForm({
            description: collection.description
        })
    }, [collection])

    //changes
    const [unsaved, setUnsaved] = useState(false)

    const onFieldChange = useCallback(e=>{
        setForm({ [e.target.name]: e.target.value })
        setUnsaved(true)
    }, [])

    const onSubmit = useCallback(e=>{
        e.preventDefault()
        dispatch(oneUpdate(collection._id, form, ()=>setUnsaved(false)))
    }, [collection._id, form])

    if (!collection.public)
        return null

    return (
        <Layout 
            as='form'
            onSubmit={onSubmit}>
            <Separator/>

            <Title>{t.s('publicPage')} {t.s('appearance').toLowerCase()}</Title>

            <Label>{t.s('description')}</Label>
            <Text 
                multiline
                autoSize
                name='description'
                value={form.description}
                onChange={onFieldChange} />

            {unsaved && (
                <Buttons>
                    <Button
                        as='input'
                        type='submit'
                        variant='primary'
                        value={t.s('save')}
                        data-block />
                </Buttons>
            )}
        </Layout>
    )
}