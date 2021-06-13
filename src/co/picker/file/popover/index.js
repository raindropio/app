import s from './index.module.styl'
import React, { useRef, useCallback, useEffect } from 'react'
import t from '~t'

import Popover from '~co/overlay/popover'
import withBase from '../base'
import DropModule from '../drop/module'
import Icon from '~co/common/icon'

function PickerSourcePopover({ files, filesDone, onDropFiles, onDropLinks, pin, onClose }) {
    const content = useRef(null)

    const onFileChange = useCallback((e)=>{
        e.preventDefault()
        onDropFiles([...e.target.files])
    }, [onDropFiles, onClose])

    useEffect(()=>{
        content.current.click()
    }, [content])

    useEffect(()=>{
        if (filesDone)
            onClose()
    }, [filesDone])

    return (
        <DropModule 
            onDropFiles={onDropFiles}
            onDropLinks={onDropLinks}>
            {({ isDropping, dropHandlers })=>
                <Popover 
                    {...dropHandlers}
                    pin={pin}
                    className={`${s.popover} ${isDropping && s.isDropping}`}
                    closable={!files.length}
                    hidden={files.length}
                    onClose={onClose}>
                    <label 
                        ref={content}
                        className={s.content}>
                        <Icon 
                            className={s.icon}
                            name='upload' 
                            enlarge='3' />

                        {t.s('upload')}&nbsp;{t.s('dropFilesHere').toLowerCase()}…

                        <input 
                            type='file' 
                            style={{display: 'none'}}
                            onChange={onFileChange} />
                    </label>
                </Popover>
            }
        </DropModule>
    )
}

export default withBase(PickerSourcePopover)