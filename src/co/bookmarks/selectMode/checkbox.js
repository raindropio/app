import React from 'react'
import { connect } from 'react-redux'
import { unselectAll, selectAll } from '~data/actions/bookmarks'

class BookmarksHeaderSelectModeCheckbox extends React.Component {
    static defaultProps = {
        selectMode: {}
    }

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

    onInputClick = ()=>{
        if (this.props.selectMode.all)
            this.props.unselectAll(this.props.selectMode.spaceId)
        else
            this.props.selectAll(this.props.selectMode.spaceId)
    }

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

export default connect(
	undefined,
	{ unselectAll, selectAll }
)(BookmarksHeaderSelectModeCheckbox)