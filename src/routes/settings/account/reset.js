import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { removeAll } from '~data/actions/collections'

import Button from '~co/common/button'
import { Error, Alert, Confirm } from '~co/overlay/dialog'
import Modal, { Header } from '~co/overlay/modal'
import Preloader from '~co/common/preloader'

class SettingsProfileReset extends React.Component {
    label = `${t.s('remove')} ${t.s('allBookmarks').toLowerCase()} ${t.s('und')} ${t.s('collectionsCount')}`
    action = `${t.s('remove')} ${t.s('all').toLowerCase()}`

    state = {
        loading: false
    }

    onResetClick = async()=>{
        if (!await Confirm(this.label+'?', { ok: this.action }))
            return

        this.setState({ loading: true })

        this.props.removeAll(
            this.onSuccess,
            this.onFail
        )
    }

    onSuccess = ()=>{
        Alert(t.s('done'))
        this.setState({ loading: false })
    }

    onFail = (e)=>{
        Error(e)
        this.setState({ loading: false })
    }

    render() {
        return (
            <>
                <Button 
                    onClick={this.onResetClick}
                    variant='link'
                    accent='danger'>
                    {this.label}
                </Button>

                {this.state.loading && (
                    <Modal 
                        important 
                        closable={false}>
                        <Header title={this.action+'…'}>
                            <Preloader />
                        </Header>
                    </Modal>
                )}
            </>
        )
    }
}

export default connect(
    undefined,
    { removeAll }
)(SettingsProfileReset)