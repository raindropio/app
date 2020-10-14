import s from './suggestions.module.styl'
import React from 'react'
import t from '~t'
import _ from 'lodash'
import { createPortal } from 'react-dom'
import { connect } from 'react-redux'
import { makeFiltersSearch, getStatus } from '~data/selectors/filters'
import { autoLoad } from '~data/actions/filters'
import { makeTagsSearch } from '~data/selectors/tags'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import FilterIcon from '~co/filters/item/icon'
import FilterTitle from '~co/filters/item/title'

const max = 13

class SearchSuggestions extends React.Component {
    static defaultProps = {
        outerRef: undefined,
        spaceId: 0,
        floating: false,
        downshift: {}
    }

    state = {
        limit: true
    }

    sections = {
        tags: <div key='_tags' className={s.section}>{t.s('tags')}</div>,
        filters: <div key='_filter' className={s.section}>{_.capitalize(t.s('fastFilter'))}</div>
    }

    componentDidMount() {
        this.props.autoLoad(this.props.spaceId, true)
    }

    componentDidUpdate(prev) {
        if (prev.spaceId != this.props.spaceId){
            this.props.autoLoad(prev.spaceId, false)
            this.props.autoLoad(this.props.spaceId, true)
        }
    }

    componentWillUnmount() {
        this.props.autoLoad(this.props.spaceId, false)
    }

    onToggleLimitClick = ()=>
        this.setState({ limit: !this.state.limit })

    renderGroup = (type, inc=0)=>{
        const { downshift: { getItemProps, highlightedIndex }, floating } = this.props

        return this.props[type].map((item, _i)=>{
            const index = _i + inc

            return (
                <Button
                    {...getItemProps({
                        key: item._id,
                        index,
                        item,
                        className: s.item,
                        variant: highlightedIndex === index ? 'primary' : 'outline',
                        size: floating ? undefined : 'small'
                    })}>
                    {type == 'filters' && <FilterIcon {...item} />}
                    {type == 'filters' ? <FilterTitle {...item} /> : item._id}
                    {item.count > 1 && <span className={s.count}>{item.count}</span> }
                </Button>
            )
        })
    }

    renderItems = ()=>{
        const tags = this.renderGroup('tags')
        const filters = this.renderGroup('filters', tags.length)

        return [
            ...(this.props.floating && tags.length ? [this.sections.tags] : []),
            ...tags,
            ...(this.props.floating && filters.length ? [this.sections.filters] : []),
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
        const { limit } = this.state

        if (!isOpen || !outerRef || !outerRef.current)
            return null

        const items = this.renderItems()
        if (!items.length) return null

        return createPortal(
            <div 
                className={s.outer}
                data-floating={floating}
                data-status={status}>
                <div className={s.inner}>
                    <div 
                        className={s.body}
                        {...getMenuProps()}>
                        {limit && !floating && items.length>max ? items.slice(0, max) : items}
                        
                        {!floating && items.length>max && (
                            <Button
                                variant='flat'
                                size='small'
                                className={s.item}
                                onClick={this.onToggleLimitClick}>
                                {limit ? t.s('more') : t.s('less')}
                                <Icon name={limit ? 'expand' : 'colapse'} size='micro' />
                            </Button>
                        )}
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
    {
        autoLoad
    }
)(SearchSuggestions)