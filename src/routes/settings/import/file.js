import s from './file.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { upload, cancel } from '~data/actions/import'
import config from '~config'

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
        const { file: { status, name, count }, cancel } = this.props

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
                            {count.folders} {t.s('folders').toLowerCase()}, {count.bookmarks} {t.s('bookmarks')} {t.s('und')} {count.tags} {t.s('tags').toLowerCase()}
                        </span>
                    </div>
                )

            case 'empty':
                return (
                    <div>
                        <Alert variant='warning'>
                            <b>{t.s('noBookmarks')}</b>
                        </Alert>
                        <br />
        
                        <Button
                            variant='outline'
                            onClick={cancel}>
                            <Icon name='refresh' />
                            {t.s('selectOtherFile')}
                        </Button>
                    </div>
                )

            default:
                return (
                    <div>
                        <Alert>
                            <b>{t.s('uploadBookmarksFile')} (html, csv {t.s('or')} txt)</b>. {t.s('importInfo2')}<br /><br />
                            <a href={config.links.help.import+'#supported-formats'} target='_blank'>
                                {t.s('help')}
                                <Icon name='open' size='micro' style={{marginLeft: 6}} />
                            </a>
                        </Alert>
                        <br />
        
                        <Button 
                            as='label'
                            variant='primary'>
                            <Icon name='upload' />
                            {t.s('upload')} {t.s('file').toLowerCase()}…
        
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
    { upload, cancel }
)(ImportFile)