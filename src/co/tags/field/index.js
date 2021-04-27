import React, { useRef, useEffect, useCallback } from 'react'
import t from '~t'

import Downshift from 'downshift'
import { MultiSelect } from '~co/common/select'
import Autocomplete from '~co/tags/autocomplete'

export default function TagsPicker({ value=[], onChange, spaceId, ...etc }) {
    const inputRef = useRef(null)
    const downshiftRef = useRef(null)

    const stateReducer = useCallback((state, changes) => {
        switch (changes.type) {
            case 'focus':
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex || -1
                }

            case Downshift.stateChangeTypes.changeInput:
                return {
                    ...changes,
                    highlightedIndex: changes.inputValue ? 0 : -1
                }

            case Downshift.stateChangeTypes.keyDownEnter:
            case Downshift.stateChangeTypes.clickItem:
                return {
                    ...changes,
                    highlightedIndex: -1,
                    isOpen: true,
                    inputValue: ''
                }

            default:
                return changes
        }
    }, [])

    const itemToString = useCallback(item => item && item._id, [])

    const onSelect = useCallback(
        item =>
            onChange([
                ...value,
                itemToString(item)
            ]),
        [value, onChange, itemToString]
    )

    const onInputKeyDown = useCallback(e => {
        switch(e.key) {
            case 'Enter':
                if (!downshiftRef.current ||
                    downshiftRef.current?.state?.highlightedIndex == -1){
                    e.preventDefault()
                    e.currentTarget.closest('form').requestSubmit()

                    if (downshiftRef.current)
                        downshiftRef.current.closeMenu()
                }
            break

            case 'Escape':
                if (e.target.value){
                    e.preventDefault()
                    e.stopPropagation()
                }
            break
        }
    }, [])

    //prevent closing window when typed value is not yet commited
    useEffect(()=>{
        function onWindowClose(e) {
            if (inputRef.current.value) {
                e.preventDefault()
                e.returnValue = ''
            }
        }

        window.addEventListener('beforeunload', onWindowClose)
        return ()=>window.removeEventListener('beforeunload', onWindowClose)
    }, [inputRef])

    return (
        <Downshift
            ref={downshiftRef}
            onChange={onSelect}
            itemToString={itemToString}
            stateReducer={stateReducer}
            selectedItem={null}>
            {downshift=>(
                <div>
                    <MultiSelect 
                        {...downshift.getInputProps({
                            placeholder: t.s('addTags')+'…',
                            ...etc,
                            ref: inputRef,
                            selected: value,
                            onSelectedChange: onChange,
                            icon: 'tag',
                            onFocus: downshift.toggleMenu,
                            onKeyDown: onInputKeyDown
                        })} />

                    <Autocomplete 
                        selected={value}
                        inputRef={inputRef}
                        spaceId={spaceId}
                        downshift={downshift} />
                </div>
            )}
        </Downshift>
    )
}