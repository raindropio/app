import { useMemo, useCallback } from 'react'
import { useCombobox } from 'downshift'

const itemToString = item => item && item.query

export default function useDownshift({ filter, applyFilter, options, suggestions }) {
    const items = useMemo(()=>[...options, ...suggestions], [options, suggestions])

    const stateReducer = useCallback((state, { type, changes }) => {
        const incompleteToken = (changes.inputValue||'').endsWith('#') || (changes.inputValue||'').endsWith(':')
    
        switch (type) {
            case useCombobox.stateChangeTypes.InputChange:
                return {
                    ...changes,
                    highlightedIndex: incompleteToken ? 0 : null
                }
    
            //select item
            case useCombobox.stateChangeTypes.InputKeyDownEnter:
            case useCombobox.stateChangeTypes.ItemClick:{
                const token = itemToString(changes.selectedItem)
                if (token)
                    applyFilter(token)

                return {
                    ...changes,
                    isOpen: incompleteToken,
                    highlightedIndex: incompleteToken ? 0 : state.highlightedIndex,
                    inputValue: '',
                }
            }
    
            default:
                return changes
        }
    }, [applyFilter])

    return useCombobox({
        items,
        itemToString,
        inputValue: filter,
        circularNavigation: false,
        selectedItem: null,
        stateReducer
    })
}