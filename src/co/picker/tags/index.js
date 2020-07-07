import React from 'react'
import t from '~t'
import Downshift from 'downshift'
import { MultiSelect } from '~co/common/select'

class TagsPicker extends React.Component {
    static defaultProps = {
        //...<input> specific
        value: [],
        onChange: undefined
    }

    input = React.createRef()

    stateReducer = (state, changes) => {
        switch (changes.type) {
            case Downshift.stateChangeTypes.keyDownEnter:
            case Downshift.stateChangeTypes.clickItem:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    isOpen: true,
                    inputValue: '',
                }
            default:
                return changes
        }
    }

    optionToString = (option={}) => option && option.value

    onSelect = selection=>{
        this.props.onChange([...this.props.value, selection.value])
    }

    render() {
        const { value, onChange, ...etc } = this.props

        return (
            <Downshift
                stateReducer={this.stateReducer}
                onChange={this.onSelect}
                itemToString={this.optionToString}
                selectedItem={null}>
                {downshift=>(
                    <div>
                        <MultiSelect 
                            {...downshift.getInputProps({
                                ...etc,
                                ref: this.input,
                                selected: value,
                                onSelectedChange: onChange,
                                placeholder: t.s('addTags')+'…',
                                icon: 'tag'
                            })} />
                    </div>
                )}
            </Downshift>
        )
    }
}

export default TagsPicker