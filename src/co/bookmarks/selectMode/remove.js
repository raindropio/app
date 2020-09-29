import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { removeSelected } from '~data/actions/bookmarks'

import { Confirm } from '~co/overlay/dialog'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class BookmarksHeaderSelectModeRemove extends React.Component {
    static defaultProps = {
        selectMode: {}
    }

    onRemoveClick = (e)=>{
        e.preventDefault()

        Confirm(t.s('areYouSure'), { variant: 'warning' })
            .then(yes=>{
                if (!yes) return
                this.props.removeSelected(this.props.selectMode.spaceId)
            })
    }

    render() {
        const { selectMode: { all, ids } } = this.props

        return (
            <Button 
                variant='outline'
                title={t.s('remove')}
                disabled={!all && !ids.length}
                onClick={this.onRemoveClick}>
                <Icon name='trash' />
                
                <span className='hide-on-small-body'>
                    {t.s('remove')}
                </span>
            </Button>
        )
    }
}

export default connect(
	undefined,
	{ removeSelected }
)(BookmarksHeaderSelectModeRemove)