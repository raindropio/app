import React from 'react'
import t from '~t'
import Icon from '~co/common/icon'
import Picker from '~co/collections/picker'

export default class BookmarksSelectModeMove extends React.Component {
    state = {
        show: false
    }

    onClick = ()=>
        this.setState({ show: true })

    onClose = ()=>
        this.setState({ show: false })

    events = {
        onItemClick: (item)=>{
            this.props.onMove(item._id)
            this.onClose()
        }
    }

    render() {
        return (
            <>
                <a className='button default' onClick={this.onClick}>
                    <Icon name='move_to' />
                    
                    <span className='hide-on-small-body'>{t.s('move')}</span>
                </a>

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