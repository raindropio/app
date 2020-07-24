import s from './view.module.styl'
import React from 'react'
import t from '~t'
import lastPart from './helpers/lastPart'

import Downshift from 'downshift'
import Input from './input'
import Suggestions from './suggestions'

function setLastPart(str, val) {
    return str.replace(new RegExp(`${lastPart(str)}$`), val)
}

export default class SearchView extends React.Component {
    static defaultProps = {
        //...same as input
        spaceId: 0,
        value: '',
        onChange: undefined, //(e)
        onSubmit: undefined,
    }

    inputRef = React.createRef()

    stateReducer = (state, changes) => {
        switch (changes.type) {
            case Downshift.stateChangeTypes.changeInput:
                return {
                    ...changes,
                    highlightedIndex: (changes.inputValue||'').startsWith('#') ? 0 : null
                }

            case Downshift.stateChangeTypes.keyDownEnter:
            case Downshift.stateChangeTypes.clickItem:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    inputValue: ''
                }

            default:
                return changes
        }
    }

    itemToString = item =>
        item && item.query

    onSelect = item => {
        const val = this.itemToString(item)

        this.props.onChange({
            target: { 
                value: setLastPart(this.props.value, val)+(val != '#' ? ' ' : '')
            }
        })
    }

    render() {
        const { spaceId, outerRef, ...etc } = this.props

        return (
            <Downshift
                onChange={this.onSelect}
                itemToString={this.itemToString}
                stateReducer={this.stateReducer}
                inputValue={lastPart(this.props.value)}
                selectedItem={null}>
                {downshift=>(
                    <div className={s.search}>
                        <Input 
                            {...downshift.getInputProps({
                                placeholder: t.s('defaultCollection-0'),
                                ...etc,
                                ref: this.inputRef,
                                clearOnEscape: !downshift.isOpen || etc.value,
                                onFocus: downshift.openMenu
                            })} />

                        <Suggestions
                            outerRef={outerRef}
                            floating={!etc.value}
                            spaceId={spaceId}
                            downshift={downshift} />

                        <DownshiftOpenState 
                            downshift={downshift} 
                            value={etc.value} />
                    </div>
                )}
            </Downshift>
        )
    }
}

class DownshiftOpenState extends React.PureComponent {
    componentDidMount() {
        this.fixOpenState()
    }

    componentDidUpdate(prev) {
        if (prev.value != this.props.value ||
            prev.downshift.isOpen != this.props.downshift.isOpen)
            this.fixOpenState()
    }

    fixOpenState() {
        if (this.props.value)
            this.props.downshift.openMenu()
    }

    render() {
        return null
    }
}