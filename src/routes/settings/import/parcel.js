import React from 'react'
import { Link } from 'react-router-dom'
import t from '~t'
import { connect } from 'react-redux'
import { cancel, parcelSave } from '~data/actions/import'

import { Buttons, Label, Progress } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { Error, Confirm } from '~co/overlay/dialog'
import Preloader from '~co/common/preloader'
import Alert from '~co/common/alert'

class ImportParcel extends React.Component {
    onStartClick = async()=>{
        const { mode } = this.props

        if (mode == 'from_scratch')
            if (!await Confirm(
                t.s('startFromScratch')+'?',
                { description: t.s('startFromScratchD') }
            ))
            return

        this.props.parcelSave(undefined, Error)
    }

    renderProgress = (children)=>{
        const { progress, file } = this.props

        return (
            <Progress 
                display='percent'
                min='0' 
                max={file.count.bookmarks + file.count.folders} 
                value={progress.bookmarks + progress.folders}>
                {children}
            </Progress>
        )
    }

    render() {
        const { status, file, cancel } = this.props

        if (file.status != 'loaded')
            return null

        switch(status) {
            case 'loading':
                return (
                    <>
                        <Label><Preloader /></Label>
                        
                        {this.renderProgress(
                            <>
                                <b>{t.s('importing')}</b>. {t.s('importingInfo2')}
                            </>
                        )}
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
                                variant='primary'>
                                <Icon name='check_active' />
                                {t.s('goHome')}
                            </Button>

                            <Button
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

                        {this.renderProgress(
                            <Alert variant='danger'>
                                <b>{t.s('fileUploadError')}</b>
                            </Alert>
                        )}

                        <Buttons>
                            <Button
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
                            variant='primary'
                            onClick={this.onStartClick}>
                            <Icon name='import_active' />
                            {t.s('startImport')}
                        </Button>
        
                        <Button
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
        mode: state.import.mode,
        file: state.import.file,
        status: state.import.parcel.status,
        progress: state.import.parcel.progress,
    }),
    { cancel, parcelSave }
)(ImportParcel)