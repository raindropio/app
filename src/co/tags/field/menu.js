import React from 'react'
import { connect } from 'react-redux'
import { load } from '~data/actions/filters'
import { makeTagsAutocomplete } from '~data/selectors/tags'

import Popover from '~co/overlay/popover'
import { Item, ItemTitle, ItemInfo } from '~co/common/list'

class TagsMenu extends React.PureComponent {
    static defaultProps = {
        spaceId: undefined, //optional

        inputRef: undefined,
        selected: [],
        downshift: {}
    }

    static itemToString = (item={}) =>
        item && item._id

    componentDidMount() {
        this.props.load(0)

        if (this.props.spaceId)
            this.props.load(this.props.spaceId)
    }

    render() {
        const {
            tags,
            inputRef,
            downshift: {
                isOpen, getMenuProps, getItemProps, highlightedIndex 
            }
        } = this.props

        if (!isOpen || !tags.length) return null

        return (
            <Popover 
                pin={inputRef}
                scaleDown={true}
                {...getMenuProps({ refKey: 'innerRef' })}>
                {tags.map((item, index)=>(
                    <Item
                        {...getItemProps({
                            key: item._id,
                            index,
                            item
                        })}
                        active={highlightedIndex === index}>
                        <ItemTitle>{item._id}</ItemTitle>
                        {item.count > 0 && (<ItemInfo>{item.count}</ItemInfo>)}
                    </Item>
                ))}
            </Popover>
        )
    }
}

export default connect(
    () => {
        const getTagsAutocomplete = makeTagsAutocomplete()
    
        return (state, { spaceId, selected, downshift: { inputValue } }) => ({
            tags: getTagsAutocomplete(state, spaceId, inputValue, selected)
        })
    },
	{ load }
)(TagsMenu)