import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { draftLoad, draftCommit, draftChange, oneRemove, oneRecover } from '~data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus, makeDraftUnsaved } from '~data/selectors/bookmarks'

import { Alert } from '~co/overlay/dialog'
import Form from './form'
import Error from './error'

class EditBookmarkContainer extends React.Component {
	static defaultProps = {
		_id:				undefined, //_id or link
		new:				{}, //optional, { item: {}, autoCreate: true, preventDuplicate: true }
		autoFocus:			''
	}

	componentDidMount() {
		this.handlers.onLoad()

		window.addEventListener('beforeunload', this.onWindowClose)
	}

	async componentWillUnmount() {
		await this.handlers.onCommit()
		
		window.removeEventListener('beforeunload', this.onWindowClose)
	}

	componentDidUpdate(prev) {
		const { _id, status, item } = this.props

		if (status != prev.status || item.type != prev.item.type) {
			if (status == 'errorSaving')
				Alert(t.s('saveError'), { variant: 'error' })
        }
        
        if (_id != prev._id){
			//save unsaved changes if user try to open another bookmark
			if (prev.unsaved)
				prev.draftCommit({ _id: prev._id })

			this.handlers.onLoad()
		}
	}

	onWindowClose = (e)=>{
		if (this.props.unsaved){
			this.handlers.onCommit()
			
			e.preventDefault()
			e.returnValue = ''
		}
	}

	handlers = {
        onLoad: ()=>{
			const { draftLoad, _id } = this.props
			draftLoad(_id, this.props.new)
		},

        onChange: (obj)=>{
			const { draftChange, _id } = this.props
			draftChange(_id, obj)
		},

		onCommit: ()=>{
			const { status } = this.props
			if (status != 'new')
				return this.handlers.onSave()
		},
    
        onSave: ()=>{
            return new Promise((res,rej)=>{
				const { draftCommit, _id } = this.props
                draftCommit(_id, res, rej)
            })
		},
		
		onRemove: ()=>{
			const { oneRemove, item: { _id } } = this.props
			if (_id)
				oneRemove(_id)
		},
    
        onRecover: ()=>{
			const { oneRecover, item: { _id } } = this.props
			if (_id)
				oneRecover(_id)
		}
    }

	render() {
		let content

		switch(this.props.status){
			case 'error':
				content = <Error />;
				break

			default:
				content = <Form {...this.props} {...this.handlers} />;
				break
		}

		return (
			<div className={s.edit}>
				{content}
			</div>
		)
	}
}

const makeMapStateToProps = () => {
	const 
		getDraftItem = makeDraftItem(),
		getDraftStatus = makeDraftStatus(),
		getDraftUnsaved = makeDraftUnsaved()

	return (state, props)=>({
		status: getDraftStatus(state, props),
		item: getDraftItem(state, props),
		unsaved: getDraftUnsaved(state, props)
	})
}

export default connect(
	makeMapStateToProps,
	{ draftLoad, draftCommit, draftChange, oneRemove, oneRecover }
)(EditBookmarkContainer)