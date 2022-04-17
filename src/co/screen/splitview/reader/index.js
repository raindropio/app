import './index.module.styl'
import React, { useEffect, useContext } from 'react'
import { Context } from '..'
import Small from '../helpers/small'

import Header from './header'
import Content from './content'
import Footer from './footer'

export default function SplitViewReader({ className='', children, fullscreen, ...etc }) {
    const splitView = useContext(Context)

    useEffect(()=>{
        splitView.reader.update({ show: true, fullscreen })
        return ()=>splitView.reader.update({ show: false })
    }, [fullscreen])

    return (
        <Small 
            as='aside'
            {...etc}
            data-fullscreen={fullscreen}
            className={'svReader '+className}
            minWidth={700}>
            {children}
        </Small>
    )
}

export {
    Header,
    Content,
    Footer,
}