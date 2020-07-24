import s from './suggestions.module.styl'
import React from 'react'
import { createPortal } from 'react-dom'
import { connect } from 'react-redux'
import { autoLoad } from '~data/actions/filters'
import { makeFiltersSearch, getStatus } from '~data/selectors/filters'
import { makeTagsSearch } from '~data/selectors/tags'

import Button from '~co/common/button'
import FilterIcon from '~co/filters/item/icon'
import FilterTitle from '~co/filters/item/title'

class SearchSuggestions extends React.Component {
    static defaultProps = {
        outerRef: undefined,
        spaceId: 0,
        floating: false,
        downshift: {}
    }

    componentDidMount() {
        const { spaceId, downshift: { isOpen }, autoLoad } = this.props
        autoLoad(spaceId, isOpen)
    }

    componentDidUpdate(prev) {
        const { spaceId, downshift: { isOpen }, autoLoad } = this.props

        if (prev.spaceId != spaceId ||
            (prev.downshift.isOpen != isOpen && isOpen)){
            autoLoad(spaceId, isOpen)

            if (prev.spaceId != spaceId)
                autoLoad(prev.spaceId, false)
        }
    }

    componentWillUnmount() {
        const { spaceId, autoLoad } = this.props
        autoLoad(spaceId, false)
    }

    renderGroup = (type, inc=0)=>{
        const { downshift: { getItemProps, highlightedIndex } } = this.props

        return this.props[type].map((item, _i)=>{
            const index = _i + inc

            return (
                <Button
                    {...getItemProps({
                        key: item._id,
                        index,
                        item,
                        size: 'small',
                        className: s.item,
                        variant: highlightedIndex === index ? 'primary' : 'outline'
                    })}>
                    {type == 'filters' && <FilterIcon {...item} />}
                    {type == 'filters' ? <FilterTitle {...item} /> : item.query}
                </Button>
            )
        })
    }

    renderItems = ()=>{
        const items = this.renderGroup('tags')

        return [
            ...items,
            ...this.renderGroup('filters', items.length)
        ]
    }

    render() {
        const {
            status,
            outerRef,
            floating,
            downshift: {
                isOpen, getMenuProps 
            }
        } = this.props

        if (!isOpen || !outerRef || !outerRef.current)
            return null

        const items = this.renderItems()

        if (!items.length)
            return null

        return createPortal(
            <div 
                className={s.outer}
                data-floating={floating}
                data-status={status}>
                <div className={s.inner}>
                    <div 
                        className={s.suggestions}
                        {...getMenuProps()}>
                        {items}
                    </div>
                </div>
            </div>,
            outerRef.current
        )
    }
}

export default connect(
    () => {
        const getFiltersAutocomplete = makeFiltersSearch()
        const getTagsSearch = makeTagsSearch()
    
        return (state, { spaceId, downshift: { inputValue } }) => ({
            status: getStatus(state, spaceId),
            filters: getFiltersAutocomplete(state, spaceId, inputValue),
            tags: getTagsSearch(state, spaceId, inputValue)
        })
    },
	{ autoLoad }
)(SearchSuggestions)