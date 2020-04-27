import React from 'react'

export default class SplitViewReaderFooter extends React.Component {
    render() {
        return (
            <footer>
                {this.props.children}
            </footer>
        )
    }
}