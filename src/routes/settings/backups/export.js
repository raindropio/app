import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { exportToEmail } from '~data/actions/user'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { Alert, Error } from '~co/overlay/dialog'

class SettingsBackupsExport extends React.Component {
    onClick = ()=>{
        this.props.exportToEmail(
            ()=>Alert(t.s('checkYourEmail'), {
                description: 'We will send you email with html export file when it be ready! Time depends on bookmarks count and queue.'
            }),
            Error
        )
    }

    render() {
        return (
            <>
                <Label>{t.s('exportBookmarks')}</Label>
    
                <div>
                    <Button 
                        variant='link'
                        onClick={this.onClick}>
                        <Icon name='install' />
                        Download .HTML
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