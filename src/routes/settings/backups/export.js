import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { exportToEmail } from '~data/actions/user'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { Alert, Error } from '~co/overlay/dialog'

class SettingsBackupsExport extends React.Component {
    state = {
        loading: false
    }

    onClick = ()=>{
        this.setState({ loading: true })

        this.props.exportToEmail(
            ()=>{
                Alert(t.s('checkYourEmail'), {
                    description: 'We will send you email with html export file when it be ready! Time depends on bookmarks count and queue.'
                })

                this.setState({ loading: false })
            },
            Error
        )
    }

    render() {
        return (
            <>
                <Label>{t.s('file')}</Label>
    
                <div>
                    <Button 
                        variant='outline'
                        disabled={this.state.loading}
                        onClick={this.onClick}>
                        <Icon name='install' />
                        {t.s('export')} .html {t.s('file').toLowerCase()}
                    </Button>
                </div>
            </>
        )
    }
}

export default connect(
    undefined,
    { exportToEmail }
)(SettingsBackupsExport)