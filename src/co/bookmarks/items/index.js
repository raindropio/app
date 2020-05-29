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
        cid:        0,
        activeId:   0,
        compact:    false,
        events:     {}  //onItemClick, onItemEditClick, onItemPreviewClick, onTagClick
    }

    componentDidMount() {
        this.load()
    }

    componentDidUpdate(prev) {
        if (prev.cid != this.props.cid ||
            prev.search != this.props.search)
            this.load()
    }

    load = ()=>{
        const { actions, cid, search, default_sort } = this.props

        actions.load(cid, {
            search,
            sort: search ? 'score' : default_sort
        })
    }

    onUploadFile = (file)=>
        new Promise((res, rej)=>{
            this.props.actions.oneUpload({
                collectionId: this.props.cid,
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
    
        return (state, { cid })=>{
            const { view, access } = getCollection(state, cid)

            return {
                items: getBookmarkIds(state, cid),
                view,
                access,
                sort: getSort(state, cid),
                selectModeEnabled: getSelectModeEnabled(state, cid),
                default_sort: state.config.raindrops_sort
            }
        }
    },
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    }),
    undefined,
    { forwardRef: true }
)(BookmarksItems)