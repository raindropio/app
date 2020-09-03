import s from './file.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { upload } from '~data/actions/import'

import { Error } from '~co/overlay/dialog'
import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Alert from '~co/common/alert'
import Preloader from '~co/common/preloader'

class ImportFile extends React.Component {
    input = React.createRef()

    onFileUpload = e=>{
        if (!e.target.files[0]) return

        this.props.upload(e.target.files[0], undefined, e=>{
            Error(e)
            this.input.current.value = ''
        })
    }

    renderButton = ()=>{
        const { file: { status, name, count } } = this.props

        switch(status) {
            case 'loading':
                return (
                    <Button>
                        <Preloader/>
                        {t.s('uploadProgress')}
                    </Button>
                )

            case 'loaded':
                return (
                    <div className={s.loaded}>
                        <b>{name}</b><br />
                        <span>
                            {count.folders} {t.s('folders').toLowerCase()}, {count.bookmarks} {t.s('elements5')} {t.s('und')} {count.tags} {t.s('tags').toLowerCase()}
                        </span>
                    </div>
                )

            default:
                return (
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
                                ref={this.input}
                                type='file'
                                style={{display: 'none'}}
                                onChange={this.onFileUpload} />
                        </Button>
                    </div>
                )
        }
    }

    render() {
        return (
            <>
                <Label>{t.s('file')}</Label>

                {this.renderButton()}
            </>
        )
    }
}

export default connect(
    state => ({
        file: state.import.file
    }),
    { upload }
)(ImportFile)