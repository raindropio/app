import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import * as actions from '~data/actions/bookmarks'

import Icon from '~co/common/icon'

class BookmarksHeaderSelectMode extends React.Component {
    onAddTagsClick = (e)=>{
        e.preventDefault()
    }

    render() {
        return (
            <a className='button default' onClick={this.onAddTagsClick}>
                <Icon name='tag' />
                
                <span className='hide-on-small-body'>{t.s('addTags')}</span>
            </a>
        )
    }
}

export default connect(
	undefined,
	actions
)(BookmarksHeaderSelectMode)