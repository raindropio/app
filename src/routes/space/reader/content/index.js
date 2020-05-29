import React from 'react'
import { Content } from '~co/screen/splitview/reader'
import HTML from './html'
import Cache from './cache'
import Web from './web'

export default ({ tab, ...props })=>{
    let content

    switch(tab) {
        case 'preview':
            if (props.item.type == 'link')
                content = <Web {...props} />
            else
                content = <HTML {...props} />
        break

        case 'cache': content = <Cache {...props} />; break
    }

    return (
        <Content>
            {content}
        </Content>
    )
}