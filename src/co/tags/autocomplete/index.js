import s from './index.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { load } from '~data/actions/filters'
import { makeTagsAutocomplete } from '~data/selectors/tags'

import Popover from '~co/overlay/popover'
import Lazy from '~co/virtual/lazy'
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

        //skip sections
        if (prev.downshift.highlightedIndex != this.props.downshift.highlightedIndex ||
            prev.downshift.inputValue != this.props.downshift.inputValue)
            if (this.props.downshift.highlightedIndex !== null &&
                this.props.tags.length &&
                this.props.tags[this.props.downshift.highlightedIndex] &&
                this.props.tags[this.props.downshift.highlightedIndex].type == 'section'){
                this.props.downshift.setHighlightedIndex(this.props.downshift.highlightedIndex + 1)
                }
    }

    loadSpace = ()=>{
        if (parseInt(this.props.spaceId))
            this.props.load(this.props.spaceId)
    }

    keyExtractor = ({_id})=>_id

    render() {
        const {
            selected,
            tags,
            inputRef,
            downshift: { isOpen, getMenuProps, getItemProps, highlightedIndex }
        } = this.props

        if (!isOpen || !tags.length) return null

        return (
            <Popover 
                pin={inputRef}
                stretch={true}
                className={s.tags}
                dataKey={tags.length+':'+selected.length}
                {...getMenuProps({ refKey: 'innerRef' })}>
                <Lazy
                    data={tags}
                    keyExtractor={this.keyExtractor}
                    scrollToItem={highlightedIndex >= 0 ? tags[highlightedIndex] : undefined}>
                    {(item, index)=>{
                        if (!item) return null

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
                    }}
                </Lazy>
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