import React from 'react'
import PickerSource from '~co/picker/source/popover'

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
                    onClick={this.onAddClick}>
                    <Icon name='add_active' />
                </Button>

                {this.state.add ? (
                    <PickerSource 
                        {...this.props}
                        pin={this.pin}
                        onClose={this.onAddClose} />
                ) : null}
            </>
        )
    }
}