import React from 'react'

export default class SplitViewMainFooter extends React.Component {
    render() {
        const { children, ...other } = this.props

        return (
            <footer {...other}>
                {children}
            </footer>
        )
    }
}