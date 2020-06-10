import React from 'react'
import t from '~t'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus } from '~data/selectors/bookmarks'

import Form from './form'
import Removed from './removed'
import Error from './error'

class EditBookmarkContainer extends React.Component {
	static defaultProps = {
		_id: 0
	}

	async componentWillUnmount() {
		await this.handlers.onSubmit()
	}

	componentDidMount() {
		this.handlers.onLoad()
	}

	componentDidUpdate(prev) {
		const { _id, status, item } = this.props

		if (status != prev.status || item.type != prev.item.type) {
			if (status == 'errorSaving')
				alert(t.s('saveError'))
        }
        
        if (_id != prev._id)
            this.handlers.onLoad()
	}

	handlers = {
        onLoad: ()=>
            this.props.actions.bookmarks.draftLoad(this.props._id),

        onChange: (obj)=>
            this.props.actions.bookmarks.draftChange(this.props.item._id, obj),
    
        onSubmit: ()=>{
            return new Promise((res,rej)=>{
                this.props.actions.bookmarks.draftCommit(this.props.item._id, res, rej)
            })
        },
    
        onRecover: ()=>
            this.props.actions.bookmarks.oneRecover(this.props.item._id)
    }

	render() {
		switch(status){
			case 'error':
				return <Error />

			case 'removed':
				return <Removed {...this.props} {...this.handlers} />

			default:
				return <Form {...this.props} {...this.handlers} />
		}
	}
}

const makeMapStateToProps = () => {
	const 
		getDraftItem = makeDraftItem(),
		getDraftStatus = makeDraftStatus()

	const mapStateToProps = (state, {_id})=>{
		const item = getDraftItem(state, {_id})
		
		return {
			status: getDraftStatus(state, {_id}),
			item
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
			bookmarks: bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(EditBookmarkContainer)