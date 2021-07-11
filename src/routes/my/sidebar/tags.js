import React from 'react'
import { connect } from 'react-redux'
import { autoLoad, load } from '~data/actions/filters'
import { getTags } from '~data/selectors/tags'

import TagsSection from '~co/tags/section'
import Tag from '~co/tags/item'

class TagsCustom extends React.Component {
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
            case 'tags': Component = TagsSection; break
            case 'tag': Component = Tag; break
            default: return false
        }

        const { getLink, activeId } = this.props
        const active = activeId.includes(row.query)

        return (
            <Component 
                {...row}
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

function TagsCombined({ tags, tags_hide, ...etc }) {
    let data = []

    if (tags.length){
        data.push({ _id: 'tags', hidden: tags_hide, count: tags.length })

        if (!tags_hide)
            data.push(...tags.map(tag=>({ ...tag, type: 'tag' })))
    }

    return (
        <TagsCustom 
            {...etc}
            data={data} />
    )
}

export default connect(
	(state) => ({
        tags: getTags(state, 'global'), 
        tags_hide: state.config.tags_hide
    }),
	{ load, autoLoad }
)(TagsCombined)