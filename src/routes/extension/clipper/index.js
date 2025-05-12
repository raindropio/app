import React, { useState, useEffect } from 'react'
import { getMeta } from '~target'

import Screen from '~co/screen/basic'
import Header from './header'
import Content from './content'

//faster load of current tab
var _cached = null
const currentTab = getMeta().then(val=>_cached = val).catch(()=>{})
//-----

export default function Clipper(props) {
    const [item, setItem] = useState(_cached)
    useEffect(async ()=>{
        if (item) return
        setItem(await currentTab)
    },[])

    return (
        <Screen>
            {item ? (<>
                <Header {...props} item={item} />
                <Content {...props} item={item} />
            </>) : null}
        </Screen>
    )
}