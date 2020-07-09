import s from './view.module.styl'
import React from 'react'
import t from '~t'

import Downshift from 'downshift'
import FiltersAutocomplete from '~co/filters/autocomplete'
import TagsAutocomplete from '~co/tags/autocomplete'
import Input from './input'

function lastPart(str) {
    const parts = (str||'').split(/\s+/)
    return parts[parts.length-1]
}

function setLastPart(str, val) {
    return str.replace(new RegExp(`${lastPart(str)}$`), val)
}

export default class SearchView extends React.Component {
    static defaultProps = {
        //...same as input
        spaceId: 0,
        value: '',
        onChange: undefined, //(e)
        onSubmit: undefined,
    }

    inputRef = React.createRef()

    stateReducer = (state, changes) => {
        switch (changes.type) {
            case Downshift.stateChangeTypes.changeInput:
                return {
                    ...changes,
                    highlightedIndex: (changes.inputValue||'').startsWith('#') ? 0 : null
                }

            case Downshift.stateChangeTypes.keyDownEnter:
            case Downshift.stateChangeTypes.clickItem:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    inputValue: '',
                    ...(changes.inputValue=='#' ? { isOpen: true } : {})
                }

            default:
                return changes
        }
    }

    itemToString = item =>
        item && item.query

    onSelect = item => {
        const val = this.itemToString(item)

        this.props.onChange({
            target: { 
                value: setLastPart(this.props.value, val)+(val != '#' ? ' ' : '')
            }
        })
    }

    render() {
        const { spaceId, ...etc } = this.props

        return (
            <Downshift
                onChange={this.onSelect}
                itemToString={this.itemToString}
                stateReducer={this.stateReducer}
                inputValue={lastPart(this.props.value)}
                selectedItem={null}>
                {downshift=>{
                    const Autocomplete = (downshift.inputValue||'').startsWith('#') ? TagsAutocomplete : FiltersAutocomplete

                    return (
                        <div className={s.search}>
                            <Input 
                                {...downshift.getInputProps({
                                    placeholder: t.s('defaultCollection-0'),
                                    ...etc,
                                    ref: this.inputRef,
                                    clearOnEscape: !downshift.isOpen,
                                    onFocus: downshift.toggleMenu,
                                    onDoubleClick: downshift.toggleMenu
                                })} />
    
                            <Autocomplete
                                inputRef={this.inputRef}
                                spaceId={spaceId}
                                downshift={downshift} />
                        </div>
                    )
                }}
            </Downshift>
        )
    }
}