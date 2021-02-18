import s from './scroll.module.styl'
import _ from 'lodash-es'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { refresh, nextPage } from '~data/actions/bookmarks'

export default function BookmarksContainerScroll({ spaceId, children }) {
    const div = useRef(null)
    const dispatch = useDispatch()

    //refresh bookmarks when window is focused and scroll on top
    const [dir, setDir] = useState('top')
    const actualize = useCallback(
        _.throttle(()=>{
            if (!div.current) return
            if (!document.hasFocus()) {
                if (dir) setDir('')
                return
            }

            let newDir = ''

            if (div.current.scrollTop >= div.current.scrollHeight - div.current.offsetHeight*3)
                newDir = 'bottom'
            else if (div.current.scrollTop <= div.current.offsetHeight*2)
                newDir = 'top'

            if (newDir && dir != newDir){
                setDir(dir)

                switch(newDir) {
                    case 'top': dispatch(refresh(spaceId)); break
                    case 'bottom': dispatch(nextPage(spaceId)); break
                }
            }
        }, 150),
        [div, spaceId, dir, setDir]
    )

    //react to focused window state
    useEffect(()=>{
        window.addEventListener('focus', actualize)
        window.addEventListener('blur', actualize)
        return ()=>{
            window.removeEventListener('focus', actualize)
            window.removeEventListener('blur', actualize)
        }
    }, [actualize])

    return (
        <div 
            ref={div}
            className={s.scroll}
            onScroll={actualize}>
            {children}
        </div>
    )
}