import React from 'react'
import Screen from '~co/screen/basic'
import { target, environment } from '~target'

let style

//restore width/height for extension
if (target == 'extension' && environment.includes('browser_action') && localStorage){
    const width = parseInt(localStorage.getItem('window-width'))||0
    const height = parseInt(localStorage.getItem('window-height'))||0
    if (width && height)
        style = { width: width+'px', height: height+'px' }
}

export default class Splash extends React.Component {
    componentWillUnmount() {
        //save width/height for extension
        if (target == 'extension' && environment.includes('browser_action') && localStorage)
            setTimeout(()=>{
                localStorage.setItem('window-width', window.innerWidth)
                localStorage.setItem('window-height', window.innerHeight)
            }, 100)
    }

    render() {
        return (
            <Screen style={style} />
        )
    }
}