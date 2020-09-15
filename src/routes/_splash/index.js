import React from 'react'
import Screen from '~co/screen/basic'

let style

//restore width/height for extension
if (process.env.APP_TARGET == 'extension' && localStorage){
    const width = parseInt(localStorage.getItem('window-width'))||0
    const height = parseInt(localStorage.getItem('window-height'))||0
    if (width && height)
        style = { width: width+'px', height: height+'px' }
}

export default class Splash extends React.Component {
    componentWillUnmount() {
        //save width/height for extension
        if (process.env.APP_TARGET == 'extension' && localStorage)
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