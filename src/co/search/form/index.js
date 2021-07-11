import s from './index.module.styl'
import React, { useCallback } from 'react'

export default function Form({ submit, downshift: { getComboboxProps }, children }) {
    const onSubmit = useCallback(e=>{
        e.preventDefault()
        submit()
    }, [submit])

    return (
        <form
            {...getComboboxProps({
                className: s.form,
                onSubmit
            })}>
            {children}
        </form>
    )
}