import React from 'react'
import t from '~t'
import Icon from '~co/common/icon'

export default class BookmarksHeaderSelectAll extends React.Component {
    state = {
        menu: false
    }

    onSelectAllClick = (e)=>{
        e.preventDefault()
        this.props.actions.selectAll(this.props.cid)
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