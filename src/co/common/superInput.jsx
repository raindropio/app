import React from 'react'
import ReactDom from 'react-dom'

export default class SuperInput extends React.Component {
	displayName = "common/superInput"

	bindRef = (r)=>this._ref=r

	componentDidMount() {
		if (this._ref){
			if (this.props.selectAll)
				this._ref.select()
			else
				this._ref.setSelectionRange(this._ref.value.length, -1)
		}
	}

	render() {
		const { selectAll, ...rest } = this.props

		return <input {...rest} ref={this.bindRef} />;
	}
}