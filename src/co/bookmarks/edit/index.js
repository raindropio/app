import s from './index.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { draftLoad, draftCommit, draftChange, oneRemove, oneRecover } from '~data/actions/bookmarks'
import { getDraftItem, getDraftStatus, makeDraftUnsaved } from '~data/selectors/bookmarks'

import { Error } from '~co/overlay/dialog'
import Form from './form'
import Crash from './crash'

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
		const { _id } = this.props

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

                draftCommit(_id, res, e=>{
					Error(e)
					rej(e)
				})
            })
		},
		
		onRemove: ()=>{
			const { oneRemove, item: { _id } } = this.props
			if (_id)
				oneRemove(_id, undefined, Error)
		},
    
        onRecover: ()=>{
			const { oneRecover, item: { _id } } = this.props
			if (_id)
				oneRecover(_id, undefined, Error)
		}
    }

	render() {
		let Component

		switch(this.props.status){
			case 'error':	Component = Crash; break
			default:		Component = Form; break
		}

		return (
			<div className={s.edit}>
				<Component 
					{...this.props}
					{...this.handlers} />
			</div>
		)
	}
}

export default connect(
	() => {
		const getDraftUnsaved = makeDraftUnsaved()
	
		return (state, { _id })=>({
			status: getDraftStatus(state, _id),
			item: getDraftItem(state, _id),
			unsaved: getDraftUnsaved(state, _id)
		})
	},
	{ draftLoad, draftCommit, draftChange, oneRemove, oneRecover }
)(EditBookmarkContainer)