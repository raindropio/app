import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { target } from '~target'
import { oneLoad } from '~data/actions/bookmarks'
import { makeBookmark } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'
import { Routes, Route, useParams } from 'react-router-dom'

import Layout from './layout'
import NotFound from './notFound'

//tabs
import Any from './tab/any'
import Cache from './tab/cache'
import Edit from './tab/edit'
import Preview from './tab/preview'
import Ask from './tab/ask'
import Web from './tab/web'

export default function PageMyItem() {
    const { itemId, cId } = useParams()
    const dispatch = useDispatch()

    //webview
    const webViewRef = useRef(null)
    
    //item
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        setIsLoading(true)
        dispatch(oneLoad(parseInt(itemId), ()=>setIsLoading(false), ()=>setIsLoading(false)))
    }, [itemId])
    const getBookmark = useMemo(makeBookmark, [])
    const item = useSelector(state=>getBookmark(state, parseInt(itemId)))

    //access
    const getCollection = useMemo(makeCollection, [])
    const { access } = useSelector(state=>getCollection(state, item.collectionId))

    const tabs = useMemo(()=>[
        ...target != 'extension' && item.type!='link' ? ['preview'] : [],
        ...target != 'extension' ? ['web'] : [],
        ...access && access.level>=3?['edit']:[],
        ...!item.fileType && access && access.level>=3?['cache']:[],
        'ask',
    ], [item, access])

    return (
        <Routes>
            <Route element={<NotFound item={item} isLoading={isLoading} />}>
                <Route element={<Layout tabs={tabs} item={item} webViewRef={webViewRef} />}>
                    {tabs.includes('cache') ?
                        <Route path='cache' element={<Cache item={item} />} /> : null
                    }
                    {tabs.includes('edit') ?
                        <Route path='edit' element={<Edit item={item} />} /> : null
                    }
                    {tabs.includes('preview') ?
                        <Route path='preview' element={<Preview item={item} webViewRef={webViewRef} />} /> : null
                    }
                    {tabs.includes('web') ?
                        <Route path='web' element={<Web item={item} webViewRef={webViewRef} />} /> : null
                    }
                    {tabs.includes('ask') ?
                        <Route path='ask' element={<Ask item={item} cId={cId} />} /> : null
                    }

                    <Route path='*' element={<Any tabs={tabs} />} />
                </Route>
            </Route>
        </Routes>
    )
}