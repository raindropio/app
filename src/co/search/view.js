import s from './view.module.styl'
import React from 'react'
import t from '~t'
import lastPart from './helpers/lastPart'

import Downshift from 'downshift'
import Input from './input'
import Suggestions from './suggestions'

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

        this.props.onChange({
            target: { 
                value: setLastPart(this.props.value, val)+(val != '#' ? ' ' : '')
            }
        })
    }

    forceOpen = ()=>
        this.setState({ forceOpen: true })

    forceClose = ()=>
        this.setState({ forceOpen: false })

    render() {
        const { spaceId, outerRef, ...etc } = this.props
        const { forceOpen } = this.state

        return (
            <Downshift
                onChange={this.onSelect}
                itemToString={this.itemToString}
                stateReducer={this.stateReducer}
                inputValue={lastPart(this.props.value)}
                isOpen={forceOpen || etc.value ? true : false}
                selectedItem={null}>
                {downshift=>(
                    <div className={s.search}>
                        <Input 
                            {...downshift.getInputProps({
                                placeholder: t.s('defaultCollection-0'),
                                ...etc,
                                ref: this.inputRef,
                                clearOnEscape: !downshift.isOpen || etc.value,
                                onFocus: this.forceOpen,
                                onBlur: this.forceClose,
                                onReset: this.forceClose,
                            })} />

                        <Suggestions
                            outerRef={outerRef}
                            floating={!etc.value}
                            spaceId={spaceId}
                            downshift={downshift} />
                    </div>
                )}
            </Downshift>
        )
    }
}