import React from 'react'
import t from '~t'
import _ from 'lodash'

import Downshift from 'downshift'
import { MultiSelect } from '~co/common/select'
import Menu from './menu'

class TagsPicker extends React.Component {
    static defaultProps = {
        //...<input> specific
        value: [],
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
        const { value, onChange, collectionId, ...etc } = this.props

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
                                placeholder: t.s('addTags')+'…',
                                ...etc,
                                ref: this.inputRef,
                                selected: value,
                                onSelectedChange: onChange,
                                icon: 'tag',
                                onFocus: downshift.toggleMenu
                            })} />

                        <Menu 
                            selected={value}
                            inputRef={this.inputRef}
                            collectionId={collectionId}
                            downshift={downshift} />
                    </div>
                )}
            </Downshift>
        )
    }
}

export default class TagsPickerWrap extends React.Component {
    onChange = value =>
        _.uniq(
            this.props.onChange(
                value.map(tag=>
                    tag.trim().replace(/^#/, '')
                )
            )
        )

    render() {
        return (
            <TagsPicker 
                {...this.props}
                onChange={this.onChange} />
        )
    }
}