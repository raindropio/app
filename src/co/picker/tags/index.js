import React from 'react'
import t from '~t'

import Downshift from 'downshift'
import { MultiSelect } from '~co/common/select'
import Menu from './menu'

export default class TagsPicker extends React.Component {
    static defaultProps = {
        //...<input> specific
        value: [],
        bookmarkId: undefined, //optional
        collectionId: undefined, //optional
        onChange: undefined
    }

    inputRef = React.createRef()

    stateReducer = (state, changes) => {
        switch (changes.type) {
            case Downshift.stateChangeTypes.changeInput:
                return {
                    ...changes,
                    highlightedIndex: changes.inputValue ? 0 : null
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

    onSelect = item =>
        this.props.onChange([
            ...this.props.value,
            Menu.itemToString(item)
        ])

    render() {
        const { value, onChange, bookmarkId, collectionId, ...etc } = this.props

        return (
            <Downshift
                onChange={this.onSelect}
                itemToString={Menu.itemToString}
                stateReducer={this.stateReducer}
                selectedItem={null}>
                {downshift=>(
                    <div>
                        <MultiSelect 
                            {...downshift.getInputProps({
                                ...etc,
                                ref: this.inputRef,
                                selected: value,
                                onSelectedChange: onChange,
                                placeholder: t.s('addTags')+'…',
                                icon: 'tag',
                                onClick: downshift.toggleMenu
                            })} />

                        <Menu 
                            selected={value}
                            inputRef={this.inputRef}
                            bookmarkId={bookmarkId}
                            collectionId={collectionId}
                            downshift={downshift} />
                    </div>
                )}
            </Downshift>
        )
    }
}