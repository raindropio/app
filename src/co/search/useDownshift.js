import { useMemo, useCallback } from 'react'
import { useCombobox } from 'downshift'
import { useDispatch } from 'react-redux'
import { set as setConfig } from '~data/actions/config'

const itemToString = item => item && item.query

export default function useDownshift({ filter, applyFilter, configs, suggestions }) {
    const dispatch = useDispatch()

    const items = useMemo(()=>[...configs, ...suggestions], [configs, suggestions])
    const haveItems = (items.length ? true : false)

    const stateReducer = useCallback((state, { type, changes }) => {
        const incompleteToken = (changes.inputValue||'').endsWith('#') || (changes.inputValue||'').endsWith(':')
    
        switch (type) {
            case useCombobox.stateChangeTypes.InputChange:
                return {
                    ...changes,
                    isOpen: changes.inputValue && haveItems,
                    highlightedIndex: 0
                }
    
            //select item
            case useCombobox.stateChangeTypes.InputKeyDownEnter:
            case useCombobox.stateChangeTypes.ItemClick:
                //config click, prevent autoclose
                if (changes.selectedItem &&
                    changes.selectedItem.config)
                    return {
                        ...state,
                        selectedItem: changes.selectedItem
                    }
    
                return {
                    ...changes,
                    isOpen: changes.inputValue && incompleteToken,
                    highlightedIndex: incompleteToken ? 0 : state.highlightedIndex,
                    inputValue: '',
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

                //config item
                if (selectedItem.config){
                    dispatch(setConfig(selectedItem.config, !selectedItem.checked))
                    return
                }

                //usual token
                const token = itemToString(selectedItem)
                if (token)
                    applyFilter(token)

                break
            }
        }
    })

    return useCombobox({
        items,
        itemToString,
        inputValue: filter,
        selectedItem: null,
        stateReducer,
        onStateChange
    })
}