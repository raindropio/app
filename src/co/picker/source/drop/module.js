import React from 'react'

export default class DropModule extends React.Component {
    static defaultProps = {
        onDropFiles: undefined, //required func
        onDropCustom: undefined, //required func
        onDropLinks: undefined, //required func
        validateCustom: undefined //(type)
    }

    blockSelf = String(new Date().getTime())

    state = {
        isDropping: false
    }

    validate = (e)=>{
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

            //link
            if (record.type === 'text/uri-list'){
                contains = 'link'
                break
            }
        }

        return contains
    }

    dropHandlers = {
        onDrop: (e)=>{
            if (!this.validate(e))
                return false
                
            e.preventDefault()
            e.stopPropagation()

            let files = []
            let links = []
            let custom = []

            for(const record of e.dataTransfer.items) {
                //file
                if (record.kind === 'file' &&
                    this.props.onDropFiles)
                    files.push(record.getAsFile())
                //custom
                else if (this.props.onDropCustom &&
                    this.props.validateCustom &&
                    this.props.validateCustom(record.type))
                    custom.push([record.type, JSON.parse(e.dataTransfer.getData(record.type))])
                //link
                else if (record.type == 'text/uri-list')
                    links.push(e.dataTransfer.getData(record.type))
            }

            if (files.length)
                this.props.onDropFiles(files)
            
            //do not send both of them
            if (custom.length)
                this.props.onDropCustom(custom)
            else if (links.length)
                this.props.onDropLinks(links)

            if (this.state.isDropping)
                this.setState({ isDropping: false })

            return false
        },

        onDragStart: (e)=>{
            e.dataTransfer.setData(this.blockSelf, '')
        },
    
        onDragOver: (e)=>{
            if (this.validate(e)){
                e.preventDefault()
                e.stopPropagation()
                e.dataTransfer.dropEffect = 'move'

                if (!this.state.isDropping)
                    this.setState({ isDropping: true })
            }
        },
    
        onDragLeave: ()=>{
            if (this.state.isDropping)
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