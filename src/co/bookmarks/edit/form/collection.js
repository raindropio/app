import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { makeCollectionPath, makeCollectionsStatus } from '~data/selectors/collections'
import { refresh } from '~data/actions/collections'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import CollectionIcon from '~co/collections/item/icon'
import Picker from '~co/collections/picker'

class BookmarkEditFormCollection extends React.Component {
    state = {
        picker: false
    }

    linkRef = React.createRef()

    componentDidMount() {
        this.props.refresh()
    }

    onPickerClick = (e)=>{
        e.preventDefault()
        this.setState({picker: true})
    }

    onPickerClose = ()=>{
        this.setState({picker: false}, ()=>{
            this.linkRef.current.focus()
        })
    }

    events = {
        onItemClick: ({ _id })=>{
            this.props.onChange({ collectionId: _id })
            this.props.onCommit()
            this.onPickerClose()
        }
    }

    render() {
        const { path, status, item: { collectionId } } = this.props
        const pathText = path.map((p)=>p.title).join(' / ')

        return (
            <>
                <Label>{t.s('collection')}</Label>

                <div>
                    <Button 
                        ref={this.linkRef}
                        href=''
                        variant='outline'
                        disabled={status=='loading'}
                        onClick={this.onPickerClick}>
                        <CollectionIcon 
                            {...path[path.length-1]}
                            loading={status=='loading'} />
                        {pathText}
                        <Icon name='arrow' />
                    </Button>
                </div>

                {this.state.picker && (
                    <Picker 
                        activeId={collectionId}
                        events={this.events}
                        onClose={this.onPickerClose} />
                )}
            </>
        )
    }
}

export default connect(
	() => {
        const getCollectionPath = makeCollectionPath()
        const getStatus = makeCollectionsStatus()
        const options = { self: true }
    
        return (state, { item: { collectionId } })=>({
            path: getCollectionPath(state, collectionId, options),
            status: getStatus(state)
        })
    },
	{ refresh }
)(BookmarkEditFormCollection)