import React from 'react'
import t from '~t'

import Downshift from 'downshift'
import { MultiSelect } from '~co/common/select'
import Autocomplete from '~co/tags/autocomplete'

export default class TagsPicker extends React.Component {
    static defaultProps = {
        //...<input> specific
        value: [],
        spaceId: undefined, //optional
        onChange: undefined
    }

    inputRef = React.createRef()

    stateReducer = (state, changes) => {
        switch (changes.type) {
            case 'focus':
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex || 0
                }

            case Downshift.stateChangeTypes.changeInput:
                return {
                    ...changes,
                    highlightedIndex: 0
                }

            case Downshift.stateChangeTypes.keyDownEnter:
            case Downshift.stateChangeTypes.clickItem:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    isOpen: true,
                    inputValue: ''
                }

            default:
                return changes
        }
    }

    itemToString = item =>
        item && item._id

    onSelect = item =>
        this.props.onChange([
            ...this.props.value,
            this.itemToString(item)
        ])

    render() {
        const { value, onChange, spaceId, ...etc } = this.props

        return (
            <Downshift
                onChange={this.onSelect}
                itemToString={this.itemToString}
                stateReducer={this.stateReducer}
                selectedItem={null}>
                {downshift=>(
                    <div>
                        <MultiSelect 
                            {...downshift.getInputProps({
                                placeholder: t.s('addTags')+'…',
                                ...etc,
                                ref: this.inputRef,
                                selected: value,
                                onSelectedChange: onChange,
                                icon: 'tag',
                                onFocus: downshift.toggleMenu
                            })} />

                        <Autocomplete 
                            selected={value}
                            inputRef={this.inputRef}
                            spaceId={spaceId}
                            downshift={downshift} />
                    </div>
                )}
            </Downshift>
        )
    }
}