import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { selectAll } from '~data/actions/bookmarks'

import Button from '~co/common/button'
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
            <Button 
                href=''
                title={t.s('select')+' '+t.s('all')}
                onClick={this.onSelectAllClick}>
                <Icon name='select_all' />
                <span className='hide-on-small-body'>{t.s('select')+' '+t.s('all')}</span>
            </Button>
        )
    }
}

export default connect(
	undefined,
	{ selectAll }
)(BookmarksHeaderSelectAll)