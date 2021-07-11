import s from './index.module.styl'
import React, { useCallback, useRef } from 'react'
import _ from 'lodash'
import t from '~t'

import { Search } from '~co/common/form'
import Downshift from 'downshift'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SearchInput({ autoFocus=false, value='', children, inputRef, onChange, onSubmit}) {
    const _downshiftRef = useRef(null)

    //utils
    const lastPart = useCallback((str)=>{
        const parts = (str||'').split(/\s+/)
        return (_.last(parts)||'').trim()
    }, [])

    const setLastPart = useCallback((str, val)=>
        (str+'').replace(new RegExp(`${_.escapeRegExp(lastPart(str))}$`), val),
        []
    )

    //downshift specific
    const stateReducer = useCallback((state, changes) => {
        const incompleteToken = (changes.inputValue||'').endsWith('#') || (changes.inputValue||'').endsWith(':')

        switch (changes.type) {
            case Downshift.stateChangeTypes.changeInput:
                return {
                    ...changes,
                    highlightedIndex: incompleteToken ? 0 : null
                }

            case Downshift.stateChangeTypes.keyDownEnter:
            case Downshift.stateChangeTypes.clickItem:
                return {
                    ...changes,
                    isOpen: incompleteToken,
                    highlightedIndex: incompleteToken ? 0 : state.highlightedIndex,
                    inputValue: '',
                }

            default:
                return changes
        }
    }, [])

    const itemToString = useCallback(item => item && item.query, [])

    //change or select
    const onSelect = useCallback(item => onChange(setLastPart(value, itemToString(item))), [value, onChange])

    const onInputChange = useCallback(e=> onChange(e.target.value), [onChange])

    //focus
    const onInputFocus = useCallback(()=>{
        if (!autoFocus)
            _downshiftRef.current.openMenu()
    }, [_downshiftRef, autoFocus])

    //keydown
    const onInputKeyDown = useCallback(e=>{
        switch(e.key) {
            case 'Home':
            case 'End':
                e.nativeEvent.preventDownshiftDefault = true
                break
        }
    }, [])

    //toggle menu
    const onToggleMenuClick = useCallback(e=>{
        e.preventDefault()
        if (_downshiftRef.current)
            _downshiftRef.current.toggleMenu()
    }, [_downshiftRef])

    return (
        <Downshift
            ref={_downshiftRef}
            onChange={onSelect}
            itemToString={itemToString}
            stateReducer={stateReducer}
            inputValue={lastPart(value)}
            selectedItem={null}>
            {downshift=>(
                <form 
                    className={s.search}
                    onSubmit={onSubmit}>
                    <Search 
                        {...downshift.getInputProps({
                            autoFocus,
                            placeholder: t.s('defaultCollection-0'),
                            ref: inputRef,
                            value,
                            clearOnEscape: !downshift.isOpen || value,
                            onChange: onInputChange,
                            onFocus: onInputFocus,
                            onKeyDown: onInputKeyDown
                        })}>
                        
                        <Button 
                            tabIndex='-1'
                            variant={downshift.isOpen ? 'active' : 'default'}
                            size='small'
                            onMouseDown={onToggleMenuClick}>
                            <Icon name={downshift.isOpen ? 'colapse' : 'expand'} size='micro' />
                        </Button>
                    </Search>

                    {children(downshift)}
                </form>
            )}
        </Downshift>
    )
}