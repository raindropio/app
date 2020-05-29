import React from 'react'
import Upload from './upload'

export default Component =>
    class PickerSourceDrop extends React.Component {
        static defaultProps = {
            onLink: undefined, //async optional
            onFile: undefined, //async optional
        }

        state = {
            files: []
        }

        onDropFiles = (files)=>
            this.setState({ files })

        onCancelFiles = ()=>
            this.setState({ files:[] })

        render() {
            return (
                <>
                    <Component 
                        {...this.props}
                        files={this.state.files}
                        onDropFiles={this.onDropFiles} />

                    <Upload
                        files={this.state.files}
                        onFile={this.props.onFile}
                        onCancel={this.onCancelFiles} />
                </>
            )
        }
    }