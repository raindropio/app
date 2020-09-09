import React from 'react'

//React to draft change events
export default class AddEvents extends React.Component {
    componentDidUpdate(prev) {
        const { status } = this.props

        //close window when bookmark is removed
        if (prev.status != status &&
            status == 'removed')
            window.close()
    }

    render() {
        return null
    }
}