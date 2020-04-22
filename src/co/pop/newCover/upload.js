import React from 'react'
import t from '~t'
import Icon from '~icon'

export default class NewCover extends React.Component {
    onChange = (e)=>{
        e.preventDefault()
        this.props.onSelect('file', e.target.files[0])
    }

    render() {
        return (
            <div className='nc-content-center'>
                <div className='nc-upload'>
                    <div className='nc-upload-icon'>
                        <Icon name='upload' size='48' />
                    </div>

                    <input
                        type='file'
                        className='button blue standart'
                        accept="image/*"
                        onChange={this.onChange}
                        />

                    <br /><br />

                    <p className='subHeadLabel'>
                        {t.s('imagesOnly')}
                    </p>
                </div>
            </div>
        )
    }
}