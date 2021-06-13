import React from 'react'
import withBase from '../base'
import Module from './module'

class PickerSourceDrop extends React.Component {
    static defaultProps = {
        //..same as ../base
    }

    render() {
        return (
            <Module {...this.props} />
        )
    }
}

export default withBase(PickerSourceDrop)