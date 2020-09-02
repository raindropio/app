import React from 'react'
import { Link } from 'react-router-dom'
import t from '~t'
import { connect } from 'react-redux'
import { cancel, parcelSave } from '~data/actions/import'

import { Buttons } from '~co/common/form'
import Button from '~co/common/button'
import { Error } from '~co/overlay/dialog'
import Preloader from '~co/common/preloader'
import Alert from '~co/common/alert'

class ImportParcel extends React.Component {
    onStartClick = ()=>
        this.props.parcelSave(undefined, Error)

    render() {
        const { status, file, cancel } = this.props

        if (file.status != 'loaded')
            return null

        switch(status) {
            case 'loading':
                return (
                    <div>
                        <Preloader />
                    </div>
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
                                {t.s('goHome')}
                            </Button>

                            <Button
                                data-block
                                onClick={cancel}>
                                {t.s('importBookmarks')} {t.s('more').toLowerCase()} {t.s('file').toLowerCase()}
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
                            {t.s('startImport')}
                        </Button>
        
                        <Button
                            data-block
                            variant='outline'
                            onClick={cancel}>
                            {t.s('cancel')}
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