import React from 'react'
import t from '~t'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Alert from '~co/common/alert'

export default class ImportFile extends React.Component {
    onFileUpload = e=>{
        
    }

    render() {
        return (
            <>
                <Label>{t.s('file')}</Label>

                <div>
                    <Alert>
                        <b>{t.s('uploadBookmarksFile')}</b>. {t.s('importInfo2')}
                    </Alert>
                    <br />

                    <Button 
                        as='label'
                        variant='primary'>
                        <Icon name='upload' />
                        {t.s('select')} {t.s('file').toLowerCase()}…

                        <input 
                            type='file'
                            style={{display: 'none'}}
                            onChange={this.onFileUpload} />
                    </Button>

                    &nbsp; &nbsp;

                    <Button variant='flat'>
                        <Icon name='help' />
                        {t.s('help')}
                    </Button>
                </div>
            </>
        )
    }
}