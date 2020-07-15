import React from 'react'
import { connect } from 'react-redux'
import { load } from '~data/actions/filters'
import { makeTagsAutocomplete } from '~data/selectors/tags'

import Popover from '~co/overlay/popover'
import TagItemView from '~co/tags/item/view'
import SectionView from '~co/tags/section/view'

class TagsMenu extends React.PureComponent {
    static defaultProps = {
        spaceId: undefined, //optional

        inputRef: undefined,
        selected: [],
        downshift: {}
    }

    componentDidMount() {
        this.props.load('0s')

        if (parseInt(this.props.spaceId))
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
                {tags.map((item, index)=>
                    item.type == 'section' ? (
                        <SectionView 
                            key={item.type+item._id}
                            {...item} />
                    ) : (
                        <TagItemView
                            {...getItemProps({
                                key: item._id,
                                index,
                                item,
                                ...item,
                                active: highlightedIndex === index
                            })} />
                    )
                )}
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