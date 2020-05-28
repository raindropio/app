import React from 'react'

export default class DropFile extends React.Component {
    static defaultProps = {
        onDropFile: undefined //required func
    }

    state = {
        isDropping: false
    }

    dropHandlers = {
        onDrop: (e)=>{
            e.preventDefault()

            let files = []

            for(const item of e.dataTransfer.items) {
                if (item.kind === 'file')
                    files.push(item.getAsFile())
            }

            if (files.length)
                this.props.onDropFile(files)

            this.setState({ isDropping: false })
        },
    
        onDragOver: (e)=>{
            let containFiles = false

            for(const item of e.dataTransfer.items)
                if (item.kind === 'file'){
                    containFiles = true
                    break
                }

            if (containFiles)
                this.setState({ isDropping: true })
        },
    
        onDragLeave: ()=>{
            this.setState({ isDropping: false })
        }
    }

    render() {
        return this.props.children({
            isDropping: this.state.isDropping,
            dropHandlers: this.dropHandlers
        })
    }
}