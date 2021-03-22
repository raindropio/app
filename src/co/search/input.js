import s from './input.module.styl'
import React from 'react'
import _ from 'lodash'
import t from '~t'

import { Search } from '~co/common/form'
import Downshift from 'downshift'

function lastPart(str) {
    const parts = (str||'').split(/\s+/)
    return (_.last(parts)||'').trim()
}

function setLastPart(str, val) {
    return (str+'').replace(new RegExp(`${_.escapeRegExp(lastPart(str))}$`), val)
}

export default class SearchInput extends React.Component {
    static defaultProps = {
        autoFocus: false,
        value: '',
        onChange: undefined, //(e)
        onSubmit: undefined,
    }

    state = {
        forceOpen: false
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
                    inputValue: ''
                }

            case Downshift.stateChangeTypes.itemMouseEnter:
                return {
                    ...changes,
                    highlightedIndex: null
                }

            case Downshift.stateChangeTypes.keyDownEscape:
                this.setState({ forceOpen: false })
                return changes

            case Downshift.stateChangeTypes.keyDownArrowDown:
            case Downshift.stateChangeTypes.keyDownArrowUp:
                this.setState({ forceOpen: true })
                return changes

            default:
                return changes
        }
    }

    itemToString = item =>
        item && item.query

    onSelect = item => {
        const val = this.itemToString(item)

        this.props.onChange(
            setLastPart(this.props.value, val)+' ',
            true
        )
    }

    //input
    onInputChange = e=>
        this.props.onChange(e.target.value)

    onInputKeyDown = e=>{
        switch(e.key) {
            case 'Home':
            case 'End':
                e.nativeEvent.preventDownshiftDefault = true
                break
        }
    }

    forceOpen = ()=>{
        if (this.props.autoFocus && !this._first)
            this._first=true
        else
            this.setState({ forceOpen: true })
    }

    forceClose = ()=>
        this.setState({ forceOpen: false })

    render() {
        const { value, children, autoFocus, onSubmit } = this.props
        const { forceOpen } = this.state

        return (
            <Downshift
                onChange={this.onSelect}
                itemToString={this.itemToString}
                stateReducer={this.stateReducer}
                inputValue={lastPart(value)}
                isOpen={forceOpen || value ? true : false}
                selectedItem={null}>
                {downshift=>(
                    <form 
                        className={s.search}
                        onSubmit={onSubmit}>
                        <Search 
                            {...downshift.getInputProps({
                                autoFocus,
                                placeholder: t.s('defaultCollection-0'),
                                ref: this.inputRef,
                                value,
                                clearOnEscape: !downshift.isOpen || value,
                                onChange: this.onInputChange,
                                onKeyDown: this.onInputKeyDown,
                                onFocus: this.forceOpen,
                                onBlur: this.forceClose,
                                onReset: this.forceClose,
                            })} />

                        {children(downshift)}
                    </form>
                )}
            </Downshift>
        )
    }
}