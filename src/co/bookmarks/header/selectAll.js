import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { selectAll } from '~data/actions/bookmarks'

import Icon from '~co/common/icon'

class BookmarksHeaderSelectAll extends React.Component {
    static defaultProps = {
        spaceId: 0
    }

    onSelectAllClick = (e)=>{
        e.preventDefault()
        this.props.selectAll(this.props.spaceId)
    }

    render() {
        return (
            <a href='' className='button default' onClick={this.onSelectAllClick}>
                <Icon name='select_all' />
                <span className='hide-on-small-body'>{t.s('select')} {t.s('all')}</span>
            </a>
        )
    }
}

export default connect(
	undefined,
	{ selectAll }
)(BookmarksHeaderSelectAll)