import React from 'react'
import { Link } from 'react-router-dom'
import t from '~t'
import { connect } from 'react-redux'
import { cancel, parcelSave } from '~data/actions/import'

import { Buttons, Label, Progress } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { Error } from '~co/overlay/dialog'
import Preloader from '~co/common/preloader'
import Alert from '~co/common/alert'

class ImportParcel extends React.Component {
    onStartClick = ()=>
        this.props.parcelSave(undefined, Error)

    render() {
        const { status, progress, file, cancel } = this.props

        if (file.status != 'loaded')
            return null

        switch(status) {
            case 'loading':
                return (
                    <>
                        <Label><Preloader /></Label>
                        
                        <Progress min='0' max={progress.max} value={progress.value}>
                            <b>{t.s('importing')}</b>. {t.s('importingInfo2')}
                        </Progress>
                    </>
                )

            case 'success':
                return (
                    <>
                        <div/>

                        <Alert variant='success'>
                            <b>{t.s('importEnd')}</b><br/>
                            {t.s('importIsProcessing')} {t.s('importIsProcessingDD')}
                        </Alert>

                        <Buttons>
                            <Button
                                as={Link}
                                to='/'
                                data-block
                                variant='primary'>
                                <Icon name='check_active' />
                                {t.s('goHome')}
                            </Button>

                            <Button
                                data-block
                                variant='outline'
                                onClick={cancel}>
                                <Icon name='refresh' />
                                {t.s('selectOtherFile')}
                            </Button>
                        </Buttons>
                    </>
                )

            case 'error':
                return (
                    <>
                        <div />

                        <Progress min='0' max='100' value={progress}>
                            <Alert variant='danger'>
                                <b>{t.s('fileUploadError')}</b>
                            </Alert>
                        </Progress>

                        <Buttons>
                            <Button
                                data-block
                                variant='outline'
                                onClick={cancel}>
                                <Icon name='refresh' />
                                {t.s('tryAgain')}
                            </Button>
                        </Buttons>
                    </>
                )

            default:
                return (
                    <Buttons>
                        <Button
                            data-block
                            variant='primary'
                            onClick={this.onStartClick}>
                            <Icon name='import_active' />
                            {t.s('startImport')}
                        </Button>
        
                        <Button
                            data-block
                            variant='outline'
                            onClick={cancel}>
                            <Icon name='refresh' />
                            {t.s('selectOtherFile')}
                        </Button>
                    </Buttons>
                )
        }
    }
}

export default connect(
    state => ({
        file: state.import.file,
        status: state.import.parcel.status,
        progress: state.import.parcel.progress,
    }),
    { cancel, parcelSave }
)(ImportParcel)