import React from 'react'
import Popover, { Menu, MenuItem } from '~co/overlay/popover'

class TagsMenu extends React.PureComponent {
    static defaultProps = {
        inputRef: undefined,
        selected: [],
        downshift: {}
    }

    static itemToString = (item={}) =>
        item && item.value

    render() {
        const {
            inputRef,
            selected,
            downshift: {
                isOpen, getMenuProps, inputValue, getItemProps, highlightedIndex 
            }
        } = this.props

        let options = [{value: 'app'}, {value: 'item'}].filter(option => !selected.includes(option.value))
            .filter(option => !inputValue || option.value.includes(inputValue))

        if (!isOpen || !options.length) return null

        return (
            <Popover 
                pin={inputRef}
                {...getMenuProps({ refKey: 'innerRef' })}>
                <Menu>
                    {options.map((option, index)=>(
                        <MenuItem
                            {...getItemProps({
                                key: option.value,
                                index,
                                item: option
                            })}
                            active={highlightedIndex === index}>
                            {option.value}
                        </MenuItem>
                    ))}
                </Menu>
            </Popover>
        )
    }
}

export default TagsMenu