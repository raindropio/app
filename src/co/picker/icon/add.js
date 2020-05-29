import React from 'react'
import Icon from '~co/common/icon'
import PickerSource from '~co/picker/source/popover'

export default class PickerIconAdd extends React.Component {
    state = {
        add: false
    }

    onAddClick = (e)=>{
        e.preventDefault()
        this.setState({ add: true })
    }

    onAddClose = ()=>
        this.setState({ add: false })

    render() {
        return (
            <>
                <a 
                    href=''
                    className='button active'
                    onClick={this.onAddClick}>
                    <Icon name='add_active' />
                </a>

                {this.state.add ? (
                    <PickerSource 
                        {...this.props}
                        onClose={this.onAddClose} />
                ) : null}
            </>
        )
    }
}