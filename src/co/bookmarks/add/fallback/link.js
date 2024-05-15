import s from './link.module.css'
import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import t from '~t'
import useDebounce from '~modules/format/callback/use-debounce'
import isURL from 'validator/es/lib/isURL'
import { oneCreate } from '~data/actions/bookmarks'
import { suggestFields } from '~data/actions/bookmarks'
import { makeSuggestedFields } from '~data/selectors/bookmarks'
import { makeCollectionPath } from '~data/selectors/collections'
import { isPro } from '~data/selectors/user'

import { Error } from '~co/overlay/dialog'
import Popover from '~co/overlay/popover'
import { Layout } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import ItemLink from '~co/bookmarks/edit/form/link'

function Suggestion({ id, primary, disabled, onClick }) {
    const getCollectionPath = useMemo(()=>makeCollectionPath(), [])
    const path = useSelector(state=>getCollectionPath(state, id, { self: true }))
    const shortPath = useMemo(()=>path.map((p)=>p.title).slice(-2).join(' / '), [path])
    const fullPath = useMemo(()=>path.map((p)=>p.title).join(' / '), [path])
    const collection = useMemo(()=>path?.[path.length-1], [path])
    const onSelfClick = useCallback(e=>onClick(parseInt(e.currentTarget.getAttribute('data-id'))), [onClick])

    if (!collection?.title)
        return null

    return (
        <Button
            data-id={id}
            variant={primary ? 'primary' : 'dotted'}
            disabled={disabled}
            data-shape='pill'
            tabIndex='-1'
            title={fullPath}
            className={s.suggestion}
            onClick={onSelfClick}>
            {primary && `${t.s('add')} ${t.s('to')}`} {shortPath}
        </Button>
    )
}

function Suggestions({ item, loading, onClick }) {
    const dispatch = useDispatch()

    //load suggestions
    const debounced = useDebounce(item, 300)
    useEffect(()=>dispatch(suggestFields(debounced)), [debounced.link])

    //get suggestions
    const enabled = useSelector(state=>state.config.ai_suggestions)
    const pro = useSelector(state=>isPro(state))
    const getSuggestedFields = useMemo(()=>makeSuggestedFields(), [])
    const { collections=[] } = useSelector(state=>getSuggestedFields(state, item))

    return (
        <div className={s.suggestions}>
            <Suggestion 
                id={item.collectionId}
                disabled={loading || !item.link}
                primary={true}
                onClick={onClick} />

            {enabled && pro && collections.length ? (<>
                <span className={s.or}>{t.s('or')} {t.s('to')}</span>

                {collections.map(id=>(
                    <Suggestion 
                        key={id}
                        id={id}
                        disabled={loading}
                        onClick={onClick}  />
                ))}
            </>) : null}
        </div>
    )
}

function AddForm({ spaceId, onEdit, pin, onClose }) {
    const dispatch = useDispatch()

    const [item, setItem] = useState(()=>({ collectionId: parseInt(spaceId)||-1 }))
    const [loading, setLoading] = useState(true)

    const onChangeField = useCallback((changed)=>
        setItem(item=>({...item, ...changed})), 
        [setItem]
    )

    const onAddTo = useCallback((collectionId)=>{
        setLoading(true)

        dispatch(oneCreate({ ...item, collectionId }, (items)=>{
            onEdit && onEdit(items)
            onClose()
        }, e=>{
            Error(e)
            setLoading(false)
        }))
    }, [item, onEdit, setLoading, onClose, dispatch])
    
    const onSubmitForm = useCallback(e=>{
        e.preventDefault()
        e.stopPropagation()
        onAddTo(item.collectionId)
    }, [onAddTo, item.collectionId])

    //grab link from clipboard
    useEffect(()=>{
        async function getLink() {
            //in safari readText works bad, so this line prevents run on safari
            await navigator.permissions.query({name: 'clipboard-read'})
            const link = await navigator.clipboard.readText()
            if (isURL(link, { require_protocol: true })) return link
        }

        getLink()
            .then(link=>onChangeField({ link }))
            .catch(e=>console.error(e))
            .finally(()=>setLoading(false))
    }, [setLoading, onChangeField])

    return (
        <Popover
            pin={pin}
            closable={true}
            className={s.modal}
            onClose={onClose}>
            <form onSubmit={onSubmitForm}>
                <Layout>
                    <ItemLink
                        key={loading}
                        autoFocus={loading ? '' : 'link'}
                        disabled={loading}
                        selectAll={true}
                        item={item}
                        onChange={onChangeField} />

                   <Suggestions 
                        item={item}
                        loading={loading}
                        onClick={onAddTo} />
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