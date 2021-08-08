import React from 'react'
import { connect } from 'react-redux'
import { autoLoad, load } from '~data/actions/filters'
import { getTags } from '~data/selectors/tags'
import { getQuickFilters } from '~data/selectors/filters'

import FiltersSection from '~co/filters/section'
import Filter from '~co/filters/item'
import TagsSection from '~co/tags/section'
import Tag from '~co/tags/item'

class FiltersTagsCustom extends React.Component {
    static defaultProps = {
        activeId:           '',
        getLink:            undefined
    }

    componentDidMount() {
        this.props.load('global')
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

        const { getLink, activeId } = this.props
        const active = activeId.includes(row.query)

        return (
            <Component 
                item={row}
                getLink={getLink}
                active={active} />
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
        data.push({ _id: 'tags', hidden: tags_hide, count: tags.length })

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
        tags: getTags(state, 'global'), 
        tags_hide: state.config.tags_hide,

        filters: getQuickFilters(state, 'global'),
        filters_hide: state.config.filters_hide
    }),
	{ load, autoLoad }
)(FiltersTagsCombined)