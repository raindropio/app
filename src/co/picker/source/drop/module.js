import React from 'react'

export default class DropModule extends React.Component {
    static defaultProps = {
        onDropFiles: undefined, //required func
        onCustom: undefined, //(type, data)
        validateCustom: undefined //(type)
    }

    blockSelf = String(new Date().getTime())

    state = {
        isDropping: false
    }

    dropHandlers = {
        onDrop: (e)=>{
            e.preventDefault()
            e.stopPropagation()

            let files = []
            let item = null

            for(const record of e.dataTransfer.items) {
                //file
                if (record.kind === 'file')
                    files.push(record.getAsFile())
                //custom
                else if (this.props.onCustom &&
                    this.props.validateCustom &&
                    this.props.validateCustom(record.type))
                    item = [record.type, JSON.parse(e.dataTransfer.getData(record.type))]
            }

            if (files.length)
                this.props.onDropFiles(files)

            if (item != null)
                this.props.onCustom(...item)

            this.setState({ isDropping: false })

            return false
        },

        onDragStart: (e)=>{
            e.dataTransfer.setData(this.blockSelf, '')
        },
    
        onDragOver: (e)=>{
            let contains = null

            if (e.dataTransfer.types.includes(this.blockSelf))
                return false

            for(const record of e.dataTransfer.items){
                //file
                if (record.kind === 'file'){
                    contains = 'file'
                    break
                }

                //custom
                if (this.props.validateCustom &&
                    this.props.validateCustom(record.type)){
                    contains = record.type
                    break
                }
            }

            if (contains){
                e.preventDefault()
                e.stopPropagation()
                this.setState({ isDropping: true })
            }

            return false
        },
    
        onDragLeave: (e)=>{
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