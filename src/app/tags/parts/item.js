import React from 'react'
import t from '~t'
import Icon from '~icon'
import Preloader from '../../../co/common/preloader'

export default class Item extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			focus: false,
			title: props.item.title
		}
	}

	onFocus = (e)=>{
		this.setState({focus: true})
	}

	onBlur = (e)=>{
		this.setState({focus: false})
	}

	onSubmit = (e)=>{
		e.preventDefault()

		if ((this.props.item.title != this.state.title)&&(this.state.title.trim()))
		this.props.update({
			tag: this.props.item.title,
			replace: this.state.title
		})
	}

	removeItem = (e)=>{
		e.preventDefault()

		if (confirm( `${t.s("remove")} ${t.s("tag")} "${this.props.item.title}"?` ))
			this.props.remove(this.props.item.title)
	}

	render() {
		const {
			item,
			selected,
			loading,
			changeSelection
		} = this.props;

		const needUpdate = (this.state.title.trim() != item.title.trim())

		return (
			<form onSubmit={this.onSubmit} className="item" data-focus={this.state.focus} data-selected={selected} data-loading={loading}>
				<label className="check">
					<input type="checkbox" tabIndex="-1" checked={selected} onChange={()=>changeSelection(item._id)} />
				</label>

				<div className="title">
					<input type="text" value={this.state.title} onChange={(e)=>this.setState({title: e.target.value})} onFocus={this.onFocus} onBlur={this.onBlur} />
				</div>

				<div className="actions">
					<div hidden={!needUpdate || loading}><a tabIndex="-1" className="button active" onClick={this.onSubmit}><b>{t.s("save")}</b></a></div>
					{loading?<Preloader className="size-small" />:null}

					<a tabIndex="-1" href={"#/collection/0/"+encodeURIComponent(JSON.stringify([{key:"tag",val:item.title}]))} className="button active">{item.count}&nbsp;{t.s("elements2")}</a>
					<a tabIndex="-1" className="button default" onClick={this.removeItem}><b><Icon name='trash'/></b></a>
				</div>
			</form>
		)
	}
}