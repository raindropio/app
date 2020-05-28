import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'

import DropFile from '~co/common/dropFile'
import Modal, { Header, Content } from '~co/overlay/modal'
import Preloader from '~co/common/preloader'

const defaultState = {
    done: [],
    failed: [],
    total: 0,
    uploading: false
}

class BookmarksUpload extends React.Component {
    static defaultProps = {
        cid: 0
    }

    state = {...defaultState}

    uploadSingleFile = (file)=>
        new Promise(res=>{
            this.props.actions.oneUpload(
                {
                    collectionId: this.props.cid,
                    file
                },
                ()=>{
                    this.setState({ done: [...this.state.done, file.name] }, res)
                },
                ()=>{
                    this.setState({ failed: [...this.state.failed, file.name] }, res)
                }
            )
        })

    onDropFiles = async(files)=>{
        this.setState({ ...defaultState, total: files.length, uploading: true })

        for(const i in files)
            await this.uploadSingleFile(files[i])

        if (!this.state.failed.length)
            this.onCancel()
        else
            this.setState({ uploading: false })
    }

    onCancel = ()=>{
        this.setState(defaultState)
    }
    
    render() {
        const { total, done, failed, uploading } = this.state

        return (
            <>
                <DropFile onDropFile={this.onDropFiles}>
                    {this.props.children}
                </DropFile>

                {(total || failed.length) ? (
                    <Modal 
                        closable={failed.length}
                        onClose={this.onCancel}>
                        <Header title={t.s('uploadProgress')}>
                            {uploading ? <Preloader className='size-small' /> : null}
                        </Header>

                        <Content data-indent>
                            {done.length} {t.s('of')} {total} {t.s('saved').toLowerCase()}

                            {failed.map(name=>
                                <div key={name}><b>{name}</b> &mdash; {t.s('fileUploadUnable')}</div>
                            )}
                        </Content>
                    </Modal>
                ) : null}
            </>
        )
    }
}

export default connect(
	undefined,
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    })
)(BookmarksUpload)