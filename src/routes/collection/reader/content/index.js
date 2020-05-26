import React from 'react'
import { Content } from '~co/screen/splitview/reader'
import HTML from './html'

export default ({ tab, ...props })=>{
    let content

    switch(tab) {
        case 'html': content = <HTML {...props} />; break
    }

    return (
        <Content>
            {content}
        </Content>
    )
}