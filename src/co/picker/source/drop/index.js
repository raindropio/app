import React from 'react'
import withBase from '../base'
import Module from './module'

class PickerSourceDrop extends React.Component {
    static defaultProps = {
        //..same as ../base
    }

    render() {
        return (
            <Module onDropFiles={this.props.onDropFiles}>
                {this.props.children}
            </Module>
        )
    }
}

export default withBase(PickerSourceDrop)