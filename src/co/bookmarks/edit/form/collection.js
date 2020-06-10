import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { makeCollectionPath } from '~data/selectors/collections'

import Icon from '~co/common/icon'
import CollectionIcon from '~co/collections/item/icon'
import Picker from '~co/collections/picker'

class BookmarkEditFormCollection extends React.Component {
    state = {
        picker: false
    }

    linkRef = React.createRef()

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
            this.onPickerClose()
        }
    }

    render() {
        const { path, status, tabIndex, item: { collectionId } } = this.props
        const pathText = path.map((p)=>p.title).join(' / ')

        return (
            <div className='fieldWrap'>
                <label className='fieldName'>{t.s('collection')}</label>

                <a 
                    ref={this.linkRef}
                    href=''
                    tabIndex={tabIndex}
                    className='selectBlank selectButton inline'
                    disabled={status=='loading'}
                    onClick={this.onPickerClick}>
                    <span className='fieldIcon'>
                        <CollectionIcon {...path[path.length-1]} />
                    </span>
                    <span className='caption'>{pathText}</span>
                    <Icon className='fieldIcon arrow' name='arrow' />
                </a>

                {this.state.picker && (
                    <Picker 
                        activeId={collectionId}
                        events={this.events}
                        onClose={this.onPickerClose} />
                )}
            </div>
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
	undefined
)(BookmarkEditFormCollection)