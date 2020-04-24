import React from 'react'

export default class SplitViewSidebarContent extends React.Component {
    render() {
        return (
            <div id='sidebarContent'>
                {this.props.children}
            </div>
        )
    }
}