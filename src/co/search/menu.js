import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { load } from '~data/actions/filters'

import Popover from '~co/overlay/popover'
import { Item, ItemTitle, ItemInfo, Section, SectionTitle } from '~co/common/list'

class SearchMenu extends React.PureComponent {
    static defaultProps = {
        spaceId: 0,
        inputRef: undefined,
        downshift: {}
    }

    static itemToString = (item={}) =>
        item && item._id

    componentDidMount() {
        this.props.spaceId && this.props.load(this.props.spaceId)
    }

    renderItem = (item, index) => {
        const {
            downshift: {
                getItemProps, highlightedIndex 
            }
        } = this.props

        if (item.type == 'section')
            return (
                <Section key={item._id}>
                    <SectionTitle>{item._id}</SectionTitle>
                </Section>
            )

        return (
            <Item
                {...getItemProps({
                    key: item._id,
                    index,
                    item
                })}
                active={highlightedIndex === index}>
                <ItemTitle>{item._id}</ItemTitle>
                {item.count > 0 && (<ItemInfo>{item.count}</ItemInfo>)}
            </Item>
        )
    }

    render() {
        const {
            data=[],
            inputRef,
            downshift: {
                isOpen, getMenuProps 
            }
        } = this.props

        if (!isOpen || !data.length) return null

        return (
            <Popover 
                pin={inputRef}
                scaleDown={true}
                {...getMenuProps({ refKey: 'innerRef' })}>
                {data.map(this.renderItem)}
            </Popover>
        )
    }
}

export default connect(
    () => {
        //const getFilters = makeSidebarFilters()
    
        return (state, { spaceId })=>{    
            return {
                data: []//getFilters(state, spaceId),
            }
        }
    },
	{ load }
)(SearchMenu)