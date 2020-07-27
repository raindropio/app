import s from './suggestions.module.styl'
import React from 'react'
import t from '~t'
import { createPortal } from 'react-dom'
import { connect } from 'react-redux'
import { makeFiltersSearch, getStatus } from '~data/selectors/filters'
import { makeTagsSearch } from '~data/selectors/tags'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import FilterIcon from '~co/filters/item/icon'
import FilterTitle from '~co/filters/item/title'

class SearchSuggestions extends React.Component {
    static defaultProps = {
        outerRef: undefined,
        spaceId: 0,
        floating: false,
        downshift: {}
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
                        className: s.item,
                        variant: highlightedIndex === index ? 'primary' : 'outline'
                    })}>
                    {type == 'filters' ? <FilterIcon {...item} /> : <Icon name='tag' size='micro' />}
                    {type == 'filters' ? <FilterTitle {...item} /> : item._id}
                </Button>
            )
        })
    }

    renderItems = ()=>{
        const tags = this.renderGroup('tags')
        const filters = this.renderGroup('filters', tags.length)

        return [
            ...(this.props.floating && tags.length ? [<div className={s.section}>{t.s('tags')}</div>] : []),
            ...tags,
            ...(this.props.floating && filters.length ? [<div className={s.section}>{t.s('fastFilter')}</div>] : []),
            ...filters
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

        if (!items.length && status!='loading')
            return null

        return createPortal(
            <div 
                className={s.outer}
                data-floating={floating}
                data-status={status}>
                <div className={s.inner}>
                    <div 
                        className={s.body}
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
    }
)(SearchSuggestions)