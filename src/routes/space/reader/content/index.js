import React from 'react'
import { Content } from '~co/screen/splitview/reader'
import Edit from './edit'
import HTML from './html'
import Cache from './cache'
import Web from './web'

export default ({ tab, ...props })=>{
    let content

    switch(tab) {
        case 'edit': content = <Edit {...props} />; break

        case 'preview':
            if (props.item.type == 'link')
                content = <Web key={props.item._id} {...props} />
            else
                content = <HTML key={props.item._id} {...props} />
        break

        case 'cache': content = <Cache key={props.item._id} {...props} />; break
    }

    return (
        <Content>
            {content}
        </Content>
    )
}