import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as filtersActions from '~data/actions/filters'
import * as configActions from '~data/actions/config'
import * as tagsActions from '~data/actions/tags'
import { getTags } from '~data/selectors/tags'
import { getFilters } from '~data/selectors/filters'

import FiltersSection from './filters/section'
import Filter from './filters/filter'
import TagsSection from './tags/section'
import Tag from './tags/tag'

class FiltersCustom extends React.Component {
    static defaultProps = {
        activeId:           '',
        events:             {} //onItemClick, onItemAppendClick
    }

    componentDidMount() {
        this.props.actions.load('0s')
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

        const { data, activeId, ...etc } = this.props
        const active = activeId.includes(row.query)

        return (
            <Component 
                {...etc}
                {...row}
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

function FiltersCombine({ tags, filters, ...etc }) {
    let data = []

    if (filters.length){
        data.push({ _id: 'filters' })
        data.push(...filters.map(filter=>({ ...filter, type: 'filter' })))
    }

    if (tags.length){
        data.push({ _id: 'tags' })
        data.push(...tags.map(tag=>({ ...tag, type: 'tag' })))
    }

    return (
        <FiltersCustom 
            {...etc}
            data={data} />
    )
}

export default connect(
	(state) => ({
        tags: getTags(state, '0s'), 
        filters: getFilters(state, '0s')
    }),
	(dispatch)=>({
		actions: {
            ...bindActionCreators(configActions, dispatch),
            ...bindActionCreators(tagsActions, dispatch),
            load: bindActionCreators(filtersActions, dispatch).load,
        }
    })
)(FiltersCombine)