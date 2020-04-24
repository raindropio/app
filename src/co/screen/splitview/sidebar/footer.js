import React from 'react'

export default class SplitViewSidebarFooter extends React.Component {
    render() {
        return (
            <footer>
                {this.props.children}
            </footer>
        )
    }
}