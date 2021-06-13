import React from 'react'
import t from '~t'
import PickerFile from '~co/picker/file/popover'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class PickerIconAdd extends React.Component {
    state = {
        add: false
    }

    pin = React.createRef()

    onAddClick = (e)=>{
        e.preventDefault()
        this.setState({ add: true })
    }

    onAddClose = ()=>
        this.setState({ add: false })

    render() {
        return (
            <>
                <Button 
                    ref={this.pin}
                    variant='link'
                    title={t.s('upload')+' '+t.s('file').toLowerCase()}
                    onClick={this.onAddClick}>
                    <Icon name='add' />
                </Button>

                {this.state.add ? (
                    <PickerFile 
                        {...this.props}
                        pin={this.pin}
                        onClose={this.onAddClose} />
                ) : null}
            </>
        )
    }
}