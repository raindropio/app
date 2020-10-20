import React from 'react'

export default class BookmarksDragItem extends React.Component {
    static defaultProps = {
        _id: 0,
        spaceId: 0,
        link: '',
        selectModeEnabled: false,
        selected: false,
        ghostClassName: ''
    }

    handlers = {
        draggable: true,
        
        onDragStart: e=>{
            const { _id, spaceId, link, selectModeEnabled, selected, ghostClassName } = this.props

            //multiselect
            if (selectModeEnabled) {
                if (selected)
                    e.dataTransfer.setData('selected_bookmarks', parseInt(spaceId))
            }
            //single
            else {
                e.dataTransfer.setData('text/uri-list', link)
                e.dataTransfer.setData('text/plain', link)
                e.dataTransfer.setData('bookmark', _id)
                
                //preview
                const dragPreview = e.currentTarget.cloneNode(true)
                dragPreview.classList.add(ghostClassName)
                dragPreview.id='dragPreview'

                document.body.appendChild(dragPreview)
                e.dataTransfer.setDragImage(dragPreview, dragPreview.offsetWidth/6, dragPreview.offsetHeight/6)
            }
        },

        onDragEnd: ()=>{
            const dragPreview = document.getElementById('dragPreview')
            if (dragPreview) dragPreview.remove()
        }
    }

    render() {
        const { children } = this.props
        return children(this.handlers)
    }
}