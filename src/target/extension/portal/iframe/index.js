import s from './index.module.styl'
import React, { useCallback } from 'react'
import useAutoSize from './useAutoSize'

function Iframe({ mode, status, forwardedRef, onLoad, onClose }) {
    const path = location.hash

    //autosize
    const style = useAutoSize(forwardedRef)

    const onFrameLoad = useCallback(e=>{
        e.target.contentWindow.close = onClose
        onLoad(e)
    }, [onLoad, onClose])

    return (
        <div 
            className={s.wrap}
            data-status={status}>
            <iframe 
                ref={forwardedRef}
                className={s.iframe}
                style={style}
                allowtransparency='true'
                src={`index.html?${mode}${path}`}
                onLoad={onFrameLoad} />
        </div>
    )
}

export default React.forwardRef((props, forwardedRef)=><Iframe {...props} forwardedRef={forwardedRef} />)