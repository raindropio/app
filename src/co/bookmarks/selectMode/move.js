import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { moveSelected } from '~data/actions/bookmarks'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Picker from '~co/collections/picker'

class BookmarksSelectModeMove extends React.Component {
    static defaultProps = {
        selectMode: {}
    }

    state = {
        show: false
    }

    onClick = ()=>
        this.setState({ show: true })

    onClose = ()=>
        this.setState({ show: false })

    events = {
        onItemClick: ({ _id })=>{
            this.props.moveSelected(this.props.selectMode.spaceId, _id)
            this.onClose()
        }
    }

    render() {
        const { selectMode: { all, ids } } = this.props

        return (
            <>
                <Button 
                    variant='outline'
                    title={t.s('move')}
                    disabled={!all && !ids.length}
                    onClick={this.onClick}>
                    <Icon name='move_to' />
                    
                    <span className='hide-on-small-body'>{t.s('move')}</span>
                </Button>

                {this.state.show ? (
                    <Picker
                        events={this.events}
                        onClose={this.onClose}
                        />
                ) : null}
            </>
        )
    }
}

export default connect(
	undefined,
	{ moveSelected }
)(BookmarksSelectModeMove)