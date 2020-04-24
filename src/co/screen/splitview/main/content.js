import React from 'react'

export default class SplitViewMainContent extends React.Component {
    render() {
        const { children, ...other } = this.props

        return (
            <div id='mainBody' {...other}>
                {children}
            </div>
        )
    }
}