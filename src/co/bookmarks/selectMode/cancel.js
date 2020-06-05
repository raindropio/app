import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { cancelSelectMode } from '~data/actions/bookmarks'

import Icon from '~co/common/icon'

class BookmarksHeaderSelectMode extends React.Component {
    static defaultProps = {
        selectMode: {}
    }

    onCancelSelectModeClick = (e)=>{
        e.preventDefault()
        this.props.cancelSelectMode(this.props.selectMode.spaceId)
    }

    render() {
        return (
            <a href='' className='button default' onClick={this.onCancelSelectModeClick}>
                <Icon name='close' />
                <span className='hide-on-small-body'>{t.s('cancel')}</span>
            </a>
        )
    }
}

export default connect(
	undefined,
	{ cancelSelectMode }
)(BookmarksHeaderSelectMode)