import React from 'react'

export default class SplitViewPanelContent extends React.Component {
    render() {
        return (
            <div id='panelContent'>
                {this.props.children}
            </div>
        )
    }
}