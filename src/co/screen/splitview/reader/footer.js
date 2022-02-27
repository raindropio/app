import React from 'react'
import Footer from '~co/common/footer'

export default class SplitViewReaderFooter extends React.Component {
    render() {
        return (
            <Footer>
                {this.props.children}
            </Footer>
        )
    }
}