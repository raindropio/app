import React from 'react'
import t from '~t'

import Icon from '~co/common/icon'

export default class PickerSourceFile extends React.Component {
    onFileChange = (e)=>{
        e.preventDefault()
        this.props.onDropFiles([...e.target.files])
    }

    render() {
        return (
            <section className='fieldLink'>
                <div className='button active select'>
                    <span className='button-icon'><Icon name='upload' /></span>
                    {t.s('upload')}&nbsp;{t.s('dropFilesHere').toLowerCase()}

                    <input type='file' onChange={this.onFileChange} />
                </div>
            </section>
        )
    }
}