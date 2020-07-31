import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { bookmarksIds, makeSelectModeEnabled, makeSort, makeViewHide, getGridSize } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

import Listing from './listing'
import PickerSourceDrop from '~co/picker/source/drop'

class BookmarksItems extends React.Component {
    static defaultProps = {
        spaceId:        0,
        activeId:       0,
        index:          0,
        compact:        false,
        compactLimit:   7,
        ignore:         0,  //ignore some collectionId when showing all bookmarks
        getLink:        undefined,
        events:         {}  //onItemClick
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
        if (document.visibilityState !== 'visible') return

        const { actions, spaceId, search, sort, ignore } = this.props

        actions.load(spaceId, {
            search,
            sort: search ? 'score' : sort,
            ignore
        })
    }

    onUploadFile = (file)=>
        new Promise((res, rej)=>{
            this.props.actions.oneUpload({
                collectionId: this.props._id,
                file
            }, res, rej)
        })

    onDropCustom = ([type, data])=>
        new Promise((res, rej)=>{
            switch(type){
                case 'bookmark':
                    this.props.actions.oneMove(parseInt(data), this.props._id, res, rej)
                break

                default:
                    res()
                break
            }
        })

    onDragCustom = (type)=>
        type == 'bookmark'

    render() {
        return (
            <PickerSourceDrop 
                onFile={this.onUploadFile}
                onCustom={this.onDropCustom}
                validateCustom={this.onDragCustom}>
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
        const getCollection = makeCollection()
        const getSelectModeEnabled = makeSelectModeEnabled()
        const getSort = makeSort()
        const getViewHide = makeViewHide()
    
        return (state, { spaceId })=>{
            const { _id, view, access } = getCollection(state, spaceId)

            return {
                _id,
                items: bookmarksIds(state, spaceId),

                view,
                viewHide: getViewHide(state, spaceId),
                gridSize: getGridSize(state, spaceId),
                listCoverRight: state.config.raindrops_list_cover_right,

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