import React from 'react'
import { connect } from 'react-redux'
import { load } from '~data/actions/filters'
import { getTags } from '~data/selectors/tags'
import { getFilters } from '~data/selectors/filters'

import FiltersSection from '~co/filters/section'
import Filter from '~co/filters/item'
import TagsSection from '~co/tags/section'
import Tag from '~co/tags/item'

class FiltersTagsCustom extends React.Component {
    static defaultProps = {
        activeId:           '',
        events:             {} //onItemClick, onItemAppendClick
    }

    componentDidMount() {
        this.props.load('0s')
    }

    rowRenderer = (row={})=>{
        let Component
        switch(row.type || row._id) {
            case 'filters': Component = FiltersSection; break
            case 'filter': Component = Filter; break
            case 'tags': Component = TagsSection; break
            case 'tag': Component = Tag; break
            default: return false
        }

        const { events, activeId } = this.props
        const active = activeId.includes(row.query)

        return (
            <Component 
                {...row}
                events={events}
                active={active}
                canAppend={activeId && !active} />
        )
    }

    render() {
        return this.props.children(
            this.props.data,
            this.rowRenderer
        )
    }
}

function FiltersTagsCombined({ tags, tags_hide, filters, filters_hide, ...etc }) {
    let data = []

    if (filters.length){
        data.push({ _id: 'filters', hidden: filters_hide })

        if (!filters_hide)
            data.push(...filters.map(filter=>({ ...filter, type: 'filter' })))
    }

    if (tags.length){
        data.push({ _id: 'tags', hidden: tags_hide })

        if (!tags_hide)
            data.push(...tags.map(tag=>({ ...tag, type: 'tag' })))
    }

    return (
        <FiltersTagsCustom 
            {...etc}
            data={data} />
    )
}

export default connect(
	(state) => ({
        tags: getTags(state, '0s'), 
        tags_hide: state.config.tags_hide,

        filters: getFilters(state, '0s'),
        filters_hide: state.config.filters_hide
    }),
	{ load }
)(FiltersTagsCombined)