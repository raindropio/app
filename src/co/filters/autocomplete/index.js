import React from 'react'
import { connect } from 'react-redux'
import { load } from '~data/actions/filters'
import { makeFiltersAutocomplete } from '~data/selectors/filters'
import { getSearch } from '~data/selectors/bookmarks'

import Popover from '~co/overlay/popover'
import FilterItemView from '~co/filters/item/view'

class FiltersAutocomplete extends React.PureComponent {
    static defaultProps = {
        spaceId: undefined, //optional

        inputRef: undefined,
        selected: [],
        downshift: {}
    }

    componentDidMount() {
        this.props.load(this.props.spaceId)
    }

    componentDidUpdate(prev) {
        if (prev.spaceId != this.props.spaceId ||
            prev.search != this.props.search)
            this.props.load(this.props.spaceId)
    }

    render() {
        const {
            filters,
            inputRef,
            downshift: {
                isOpen, getMenuProps, getItemProps, highlightedIndex 
            }
        } = this.props

        if (!isOpen || !filters.length) return null

        return (
            <Popover 
                pin={inputRef}
                stretch={true}
                {...getMenuProps({ refKey: 'innerRef' })}>
                {filters.map((item, index)=>(
                    <FilterItemView
                        {...getItemProps({
                            key: item._id,
                            index,
                            item,
                            ...item,
                            active: highlightedIndex === index
                        })} />
                ))}
            </Popover>
        )
    }
}

export default connect(
    () => {
        const getFiltersAutocomplete = makeFiltersAutocomplete()
    
        return (state, { spaceId, downshift: { inputValue } }) => ({
            filters: getFiltersAutocomplete(state, spaceId, inputValue),
            search: getSearch(state, spaceId)
        })
    },
	{ load }
)(FiltersAutocomplete)