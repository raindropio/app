import React from 'react'
import t from '~t'

import Modal, { Header, Content } from '~co/overlay/modal'
import Preloader from '~co/common/preloader'

const defaultState = {
    done: [],
    failed: [],
    uploading: false
}

export default class PickerSourceBaseUpload extends React.Component {
    static defaultProps = {
        files: [],
        onFile: undefined, //async
        onCancel: undefined
    }

    state = {...defaultState}

    componentDidMount() {
        this.upload()
    }

    componentDidUpdate(prev) {
        if (prev.files != this.props.files)
            this.upload()
    }

    upload = async()=>{
        if (!this.props.files.length)
            return

        this.setState({ ...defaultState, uploading: true })

        for(const i in this.props.files)
            await this.uploadSingle(this.props.files[i])

        if (!this.state.failed.length)
            this.cancel()
        else
            this.setState({ uploading: false })
    }

    uploadSingle = (file)=>
        new Promise(res=>{
            this.props.onFile(file)
                .then(()=>{
                    this.setState({ done: [...this.state.done, file.name] }, res)
                })
                .catch(e=>{
                    this.setState({ failed: [...this.state.failed, { name: file.name, message: e.message }] }, res)
                })
        })

    cancel = ()=>{
        this.setState(defaultState)
        this.props.onCancel()
    }

    render() {
        const { failed, uploading, done } = this.state
        const { files } = this.props

        if (!uploading && !failed.length)
            return null

        return (
            <Modal 
                closable={failed.length}
                onClose={this.cancel}>
                <Header title={t.s('uploadProgress')}>
                    {uploading ? <Preloader className='size-small' /> : null}
                </Header>

                <Content data-indent>
                    {done.length} {t.s('of')} {files.length} {t.s('saved').toLowerCase()}

                    {failed.map(({name, message})=>
                        <div key={name}><b>{name}</b> &mdash; {message||t.s('fileUploadUnable')}</div>
                    )}
                </Content>
            </Modal>
        )
    }
}