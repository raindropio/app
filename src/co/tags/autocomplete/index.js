import s from './index.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { load } from '~data/actions/filters'
import { makeTagsAutocomplete } from '~data/selectors/tags'

import Popover from '~co/overlay/popover'
import VirtualList from '~co/virtual/list'
import { ItemHeightCallback } from '~co/common/list'
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
        this.props.load('global')
        this.loadSpace()
    }

    componentDidUpdate(prev) {
        if (prev.spaceId != this.props.spaceId)
            this.loadSpace()

        if (prev.tags.length != this.props.tags.length)
            this.props.downshift.setItemCount(this.props.tags.length)
    }

    loadSpace = ()=>{
        if (parseInt(this.props.spaceId))
            this.props.load(this.props.spaceId)
    }

    computeItemKey = index=>
        this.props.tags[index]._id

    renderItem = index=>{
        const {
            tags,
            downshift: { getItemProps, highlightedIndex }
        } = this.props

        const item = tags[index]

        if (item.type == 'section')
            return (
                <SectionView 
                    key={item.type+item._id}
                    {...item} />
            )
        
        return (
            <TagItemView
                {...getItemProps({
                    key: item._id,
                    index,
                    item,
                    ...item,
                    showIcon: false,
                    active: highlightedIndex === index
                })} />
        )
    }

    render() {
        const {
            tags,
            inputRef,
            downshift: { isOpen, getMenuProps, highlightedIndex }
        } = this.props
        const virtualized = tags.length > 50

        if (!isOpen || !tags.length) return null

        return (
            <Popover 
                pin={inputRef}
                stretch={true}
                className={virtualized ? s.virtualized : undefined}
                {...getMenuProps({ refKey: 'innerRef' })}>
                <ItemHeightCallback>{itemHeight=>
                    <VirtualList 
                        disableVirtualization={!virtualized}

                        computeItemKey={this.computeItemKey}
                        item={this.renderItem}
                        totalCount={tags.length}
                        itemHeight={itemHeight}
                        overscan={1000}
                        
                        dataKey={highlightedIndex}/>
                }</ItemHeightCallback>
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