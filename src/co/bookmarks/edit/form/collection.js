import React from 'react'
import t from '~t'
import _ from 'lodash-es'
import { connect } from 'react-redux'
import { makeCollectionPath } from '~data/selectors/collections'
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
        const { path, item: { collectionId } } = this.props
        const pathText = path.map((p)=>p.title).join(' / ')

        return (
            <>
                <Label>{t.s('collection')}</Label>

                <div>
                    <Button 
                        ref={this.linkRef}
                        href=''
                        variant='outline'
                        onClick={this.onPickerClick}
                        title={pathText}>
                        <CollectionIcon 
                            {...(_.last(path)||{})} />
                        <span>{pathText || t.s('selectCollection')+'…'}</span>
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
        const options = { self: true }
    
        return (state, { item: { collectionId } })=>({
            path: getCollectionPath(state, collectionId, options)
        })
    },
	{ refresh }
)(BookmarkEditFormCollection)