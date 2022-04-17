import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getMeta } from '~target'

import Screen from '~co/screen/basic'
import Header from './header'
import Content from './content'
import Events from './events'

//faster load of current tab
let _meta = {}
getMeta().then(m=>_meta = m).catch(()=>{})

/*
    ?link=&title=
*/
export default function AddRoute() {
    const { search } = useLocation()

    const collectionId = useSelector(state=>
        state.config.add_default_collection || state.config.last_collection
    )

    //item
    const item = useMemo(()=>{
        //parse search query
        const item = Object.fromEntries(new URLSearchParams(search))||{}

        for(const i in item)
            try{item[i]=JSON.parse(item[i])}catch(e){}

        if (typeof item.tags == 'string')
            item.tags = item.tags.split(',')

        return {
            //in extension environment try to set a meta if url is current tab
            ...(_meta.link == item.link ? _meta : {}),

            collectionId,

            //item from search query
            ...item
        }
    }, [search, collectionId])

    return (
        <Screen>
            <Header item={item} />
            <Content item={item} />
            <Events />
        </Screen>
    )
}