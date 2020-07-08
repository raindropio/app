import s from './view.module.styl'
import React from 'react'
import t from '~t'

import Downshift from 'downshift'
import Menu from './menu'
import Input from './input'

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
                    highlightedIndex: changes.inputValue ? 0 : null
                }

            case Downshift.stateChangeTypes.keyDownEnter:
            case Downshift.stateChangeTypes.clickItem:
                return {
                    ...changes,
                    highlightedIndex: state.highlightedIndex,
                    isOpen: true,
                    inputValue: ''
                }

            default:
                return changes
        }
    }

    onSelect = item =>
        this.props.onChange({ target: { value: Menu.itemToString(item) } })

    render() {
        const { spaceId, ...etc } = this.props

        return (
            <Downshift
                onChange={this.onSelect}
                itemToString={Menu.itemToString}
                stateReducer={this.stateReducer}
                inputValue={this.props.value}
                selectedItem={null}>
                {downshift=>(
                    <div className={s.search}>
                        <Input 
                            {...downshift.getInputProps({
                                placeholder: t.s('defaultCollection-0'),
                                ...etc,
                                ref: this.inputRef,
                                onFocus: downshift.toggleMenu
                            })} />

                        <Menu
                            inputRef={this.inputRef}
                            spaceId={spaceId}
                            downshift={downshift} />
                    </div>
                )}
            </Downshift>
        )
    }
}