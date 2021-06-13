import s from './progress.module.styl'
import React from 'react'
import t from '~t'

import Modal, { Header, Content } from '~co/overlay/modal'
import Preloader from '~co/common/preloader'

const defaultState = {
    done: [],
    failed: [],
    uploading: false
}

export default class PickerSourceBaseProgress extends React.Component {
    static defaultProps = {
        items: [],
        getName: undefined,
        process: undefined, //async
        onDone: undefined,
        onCancel: undefined
    }

    state = {...defaultState}

    componentDidMount() {
        this.upload()
    }

    componentDidUpdate(prev) {
        if (prev.items != this.props.items)
            this.upload()
    }

    upload = async()=>{
        if (!this.props.items.length)
            return

        this.setState({ ...defaultState, uploading: true })

        for(const i in this.props.items)
            await this.uploadSingle(this.props.items[i])

        if (!this.state.failed.length){
            if (typeof this.props.onDone == 'function')
                this.props.onDone()
                
            this.cancel()
        }
        else
            this.setState({ uploading: false })
    }

    uploadSingle = (item)=>
        new Promise(res=>{
            this.props.process(item)
                .then(()=>{
                    this.setState({ done: [...this.state.done, this.props.getName(item)] }, res)
                })
                .catch(e=>{
                    this.setState({ failed: [...this.state.failed, { name: this.props.getName(item), message: e.message }] }, res)
                })
        })

    cancel = ()=>{
        this.setState(defaultState)
        this.props.onCancel()
    }

    render() {
        const { failed, uploading, done } = this.state
        const { items } = this.props

        if (!uploading && !failed.length)
            return null

        return (
            <Modal 
                closable={failed.length}
                onClose={this.cancel}>
                <Header 
                    title={t.s('uploadProgress')}
                    data-no-shadow>
                    {uploading ? <Preloader /> : null}
                </Header>

                <Content data-indent>
                    <div className={s.title}>
                        {done.length} {t.s('of')} {items.length} {t.s('saved').toLowerCase()}
                    </div>

                    {failed.map(({name, message})=>
                        <div key={name} className={s.failed}>
                            <b>{name}</b> &mdash; {message||t.s('fileUploadUnable')}
                        </div>
                    )}
                </Content>
            </Modal>
        )
    }
}