import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as filtersActions from '~data/actions/filters'
import * as configActions from '~data/actions/config'
import * as tagsActions from '~data/actions/tags'
import { makeFlatFilters } from '~data/selectors/filters'

import Section from '../section'
import Tag from '../tag'
import Type from '../type'
import Status from '../status'

class FiltersCustom extends React.Component {
    static defaultProps = {
        uriPrefix:          '',
        activeId:           ''
    }

    componentDidMount() {
        this.props.actions.load(0)
    }

    rowRenderer = (row)=>{
        let Component
        switch(row.type) {
            case 'section': Component = Section; break
            case 'tag': Component = Tag; break
            case 'type': Component = Type; break
            case 'status': Component = Status; break
            default: return false
        }

        const { data, activeId, uriPrefix, ...etc } = this.props

        return (
            <Component 
                {...etc}
                {...row}
                to={`${uriPrefix}0/${encodeURIComponent(row.query)}`}
                active={row.query == decodeURIComponent(activeId)} />
        )
    }

    render() {
        return this.props.children(
            this.props.data,
            this.rowRenderer
        )
    }
}

export default connect(
	() => {
        const getFilters = makeFlatFilters()
    
        return (state)=>{    
            return {
                data: getFilters(state, 0),
            }
        }
    },
	(dispatch)=>({
		actions: {
            ...bindActionCreators(configActions, dispatch),
            ...bindActionCreators(tagsActions, dispatch),
            load: bindActionCreators(filtersActions, dispatch).load,
        }
    }),
    undefined,
    { forwardRef: true }
)(FiltersCustom)