import React from 'react'
import Reader from '~co/screen/splitview/reader'
import Header from './header'

export default (props)=>(
    <Reader 
        show={props.item._id?true:false}
        fullscreen={props.fullscreen}>
        <Header
            {...props} />
    </Reader>
)