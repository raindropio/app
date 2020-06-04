import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { makeBookmarksFlatSections, makeSelectModeEnabled, makeSort } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

import Listing from './listing'
import PickerSourceDrop from '~co/picker/source/drop'

class BookmarksItems extends React.Component {
    static defaultProps = {
        spaceId:    0,
        activeId:   0,
        compact:    false,
        events:     {}  //onItemClick, onItemEditClick, onItemPreviewClick, onTagClick
    }

    componentDidMount() {
        this.load()
    }

    componentDidUpdate(prev) {
        if (prev.spaceId != this.props.spaceId ||
            prev.search != this.props.search)
            this.load()
    }

    load = ()=>{
        const { actions, spaceId, search, sort } = this.props

        actions.load(spaceId, {
            search,
            sort: search ? 'score' : sort
        })
    }

    onUploadFile = (file)=>
        new Promise((res, rej)=>{
            this.props.actions.oneUpload({
                collectionId: this.props.spaceId,
                file
            }, res, rej)
        })

    render() {
        return (
            <PickerSourceDrop onFile={this.onUploadFile}>
                {drop=>
                    <Listing 
                        {...this.props}
                        {...drop} />
                }
            </PickerSourceDrop>
        )
    }
}

export default connect(
	() => {
        const getBookmarkIds = makeBookmarksFlatSections()
        const getCollection = makeCollection()
        const getSelectModeEnabled = makeSelectModeEnabled()
        const getSort = makeSort()
    
        return (state, { spaceId })=>{
            const { view, access } = getCollection(state, spaceId)

            return {
                items: getBookmarkIds(state, spaceId),
                view,
                access,
                sort: getSort(state, spaceId),
                selectModeEnabled: getSelectModeEnabled(state, spaceId)
            }
        }
    },
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    }),
    undefined,
    { forwardRef: true }
)(BookmarksItems)