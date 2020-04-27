import React from 'react'

export default class SplitViewReaderContent extends React.Component {
    render() {
        return (
            <div className='readerContent'>
                {this.props.children}
            </div>
        )
    }
}