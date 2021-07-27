import { useCallback, useMemo } from 'react'
import { useCombobox } from 'downshift'

const itemToString = item => item && item.query

export default function useDownshift({ filter, applyFilter, suggestions, recent }) {
    const haveItems = (suggestions.length ? true : false)

    const stateReducer = useCallback((state, { type, changes }) => {
        const incompleteToken = (changes.inputValue||'').endsWith('#') || (changes.inputValue||'').endsWith(':')
    
        switch (type) {
            case useCombobox.stateChangeTypes.InputChange:
                return {
                    ...changes,
                    isOpen: changes.inputValue && haveItems,
                    highlightedIndex: incompleteToken ? 0 : -1
                }
    
            //select item
            case useCombobox.stateChangeTypes.InputKeyDownEnter:
            case useCombobox.stateChangeTypes.ItemClick:
                return {
                    ...changes,
                    isOpen: changes.inputValue && incompleteToken,
                    highlightedIndex: incompleteToken ? 0 : state.highlightedIndex,
                    inputValue: '',
                }

            case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
                return {
                    ...changes,
                    isOpen: !haveItems ? false : changes.isOpen
                }
    
            default:
                return changes
        }
    }, [haveItems])

    const onStateChange = useCallback(({type, selectedItem})=>{
        switch(type) {
            //select item
            case useCombobox.stateChangeTypes.InputKeyDownEnter:
            case useCombobox.stateChangeTypes.ItemClick:{
                if (!selectedItem) return

                //usual token
                const token = itemToString(selectedItem)
                if (token)
                    applyFilter(token)

                break
            }
        }
    })

    const items = useMemo(()=>[...suggestions, ...recent], [suggestions, recent])

    return useCombobox({
        items,
        itemToString,
        inputValue: filter,
        selectedItem: null,
        stateReducer,
        onStateChange
    })
}