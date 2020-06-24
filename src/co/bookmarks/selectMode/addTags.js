import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import * as actions from '~data/actions/bookmarks'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

class BookmarksHeaderSelectMode extends React.Component {
    onAddTagsClick = (e)=>{
        e.preventDefault()
    }

    render() {
        return (
            <Button variant='outline' onClick={this.onAddTagsClick}>
                <Icon name='tag' />
                
                <span className='hide-on-small-body'>{t.s('addTags')}</span>
            </Button>
        )
    }
}

export default connect(
	undefined,
	actions
)(BookmarksHeaderSelectMode)