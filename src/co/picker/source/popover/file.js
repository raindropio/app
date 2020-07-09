import React from 'react'
import t from '~t'

import { Layout, Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class PickerSourceFile extends React.Component {
    onFileChange = (e)=>{
        e.preventDefault()
        this.props.onDropFiles([...e.target.files])
    }

    render() {
        return (
            <Layout>
                <Label>{t.s('file')}</Label>

                <Button as='label' variant='outline'>
                    <Icon name='upload' />
                    {t.s('upload')}&nbsp;{t.s('dropFilesHere').toLowerCase()}…

                    <input type='file' style={{display: 'none'}} onChange={this.onFileChange} />
                </Button>
            </Layout>
        )
    }
}