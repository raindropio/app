import React from 'react'

export default class BookmarksHeaderSelectModeCheckbox extends React.PureComponent {
    _allCheckbox = React.createRef()

    componentDidMount() {
        this.updateCheckbox()
    }

    componentDidUpdate(prev) {
        if (prev.selectMode.all != this.props.selectMode.all ||
            prev.selectMode.ids.length != this.props.selectMode.ids.length)
            this.updateCheckbox()
    }

    updateCheckbox = ()=>{
        const { all, ids } = this.props.selectMode
        this._allCheckbox.current.indeterminate = !all && ids.length != 0 ? true : undefined
    }

    onInputClick = ()=>
        this.props.onSelectAllClick()

    render() {
        const { selectMode } = this.props

        return (
            <label className='button flat'>
                <input 
                    ref={this._allCheckbox}
                    type='checkbox'
                    checked={selectMode.all}
                    onChange={this.onInputClick} />
            </label>
        )
    }
}