import React from 'react'
import t from '~t'

import Button from '~co/common/button'

export default class PickerIconReset extends React.Component {
    onClick = (e)=>{
        e.preventDefault()
        this.props.onLink('')
    }

    render() {
        return (
            <Button 
                href=''
                variant='link'
                onClick={this.onClick}>
                {t.s('remove')}
            </Button>
        )
    }
}