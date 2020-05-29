import React from 'react'

export default class DropFile extends React.Component {
    static defaultProps = {
        onDropFiles: undefined //required func
    }

    state = {
        isDropping: false
    }

    dropHandlers = {
        onDrop: (e)=>{
            e.preventDefault()
            e.stopPropagation()

            let files = []

            for(const item of e.dataTransfer.items) {
                if (item.kind === 'file')
                    files.push(item.getAsFile())
            }

            if (files.length)
                this.props.onDropFiles(files)

            this.setState({ isDropping: false })

            return false
        },
    
        onDragOver: (e)=>{
            e.preventDefault()
            e.stopPropagation()

            let containFiles = false

            for(const item of e.dataTransfer.items)
                if (item.kind === 'file'){
                    containFiles = true
                    break
                }

            if (containFiles)
                this.setState({ isDropping: true })

            return false
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