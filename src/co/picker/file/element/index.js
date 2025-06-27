import React, { useCallback } from 'react'
import withBase from '../base'

/*
    <label>
        <PickerFile onFile={async file=>}>
            ...
        </PickerFile>
    </label>
*/

function PickerFileElement({ children, onDropFiles }) {
    const onFileChange = useCallback((e)=>{
        e.preventDefault()
        onDropFiles([...e.target.files])
    }, [onDropFiles])

    return (
        <>
            {children}

            <input 
                type='file' 
                accept='*/*'
                hidden
                onChange={onFileChange} />
        </>
    )
}

export default withBase(PickerFileElement)