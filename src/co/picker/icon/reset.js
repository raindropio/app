import React from 'react'
import t from '~t'

export default class PickerIconReset extends React.Component {
    onClick = (e)=>{
        e.preventDefault()
        this.props.onLink('')
    }

    render() {
        return (
            <a 
                href=''
                className='button active'
                onClick={this.onClick}>
                {t.s('remove')}
            </a>
        )
    }
}