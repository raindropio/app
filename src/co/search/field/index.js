import s from './index.module.styl'
import React, { useCallback, forwardRef } from 'react'
import t from '~t'

import { Search as Field } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

function SearchField({ downshift: { getInputProps, isOpen, openMenu, toggleMenu }, autoFocus, value, setValue, menuItemsCount, forwardedRef }) {
    const onChange = useCallback(e=> setValue(e.target.value) , [setValue])
    
    const onFocus = useCallback(e=>{
        if (!autoFocus && !e.target.value) openMenu()
    }, [openMenu])

    const onToggleMouseDown = useCallback(e=>e.preventDefault(), [])

    return (
        <Field
            {...getInputProps({
                ref: forwardedRef,
                className: s.field,
                autoFocus,
                value,
                clearOnEscape: isOpen || value,
                placeholder: t.s('defaultCollection-0'),

                onChange,
                onFocus
            })}>
            {/* toggle button */}
            {!!menuItemsCount && (
                <Button 
                    title={t.s('defaultCollection-0')+' '+t.s('settings').toLowerCase()}
                    variant={isOpen ? 'active' : 'default'}
                    size='small'
                    onMouseDown={onToggleMouseDown}
                    onMouseUp={toggleMenu}>
                    <Icon name='tune' size='micro' />
                    <Icon name='arrow' size='micro' />
                </Button>
            )}
        </Field>
    )
}

export default forwardRef((props, ref) => {
    return <SearchField {...props} forwardedRef={ref} />
})