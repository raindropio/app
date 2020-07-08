import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { load } from '~data/actions/filters'
import makeSelector from './selector'

import Popover from '~co/overlay/popover'
import { Item, ItemTitle, ItemInfo, Section, SectionTitle } from '~co/common/list'

class TagsMenu extends React.PureComponent {
    static defaultProps = {
        collectionId: undefined, //optional

        inputRef: undefined,
        selected: [],
        downshift: {}
    }

    static itemToString = (item={}) =>
        item && item._id

    componentDidMount() {
        this.props.load(0)

        if (this.props.collectionId)
            this.props.load(this.props.collectionId)
    }

    render() {
        const {
            groups,
            inputRef,
            downshift: {
                isOpen, getMenuProps, getItemProps, highlightedIndex 
            }
        } = this.props

        if (!isOpen || !groups.length) return null

        return (
            <Popover 
                pin={inputRef}
                scaleDown={true}
                {...getMenuProps({ refKey: 'innerRef' })}>
                {groups.map(({ items, group })=>(
                    <div key={group}>
                        <Section>
                            <SectionTitle>{t.s(group)}</SectionTitle>
                        </Section>
                        
                        {items.map(item=>(
                            <Item
                                {...getItemProps({
                                    key: item._id,
                                    index: item.index,
                                    item
                                })}
                                active={highlightedIndex === item.index}>
                                <ItemTitle>{item._id}</ItemTitle>
                                {item.count > 0 && (<ItemInfo>{item.count}</ItemInfo>)}
                            </Item>
                        ))}
                    </div>
                ))}
            </Popover>
        )
    }
}

export default connect(
    () => {
        const getGroups = makeSelector()
        const emptyArray = []
    
        return (state, props) => ({
            groups: props.downshift.isOpen ?
                getGroups(state, props, props.downshift.inputValue) :
                emptyArray
        })
    },
	{ load }
)(TagsMenu)