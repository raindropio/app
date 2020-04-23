import React from 'react'
import Pop from '~actions/pop'

export default class Prompt extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: props.value
        }
    }

    _bindInput = (r)=>this._input=r

    componentDidMount() {
        this._input && this._input.select()
    }

    onChange = (e)=>this.setState({value: e.target.value})

    onSubmit = (e)=>{
        e.preventDefault()
        Pop.close()
        this.props.onSubmit(this.state.value)
    }

	render() {
		return (
			<div className="superForm">
                <form onSubmit={this.onSubmit}>
                    <figure className="fieldWrap">
                        <label className="fieldName" htmlFor="promptValue">{this.props.title}</label>
                        <input 
                                ref={this._bindInput}
                                type="text"
                                id="promptValue"
                                className="field"
                                autoFocus
                                value={this.state.value}
                                onChange={this.onChange} />
                    </figure>
                    
                    <div className='fieldWrap no-border'>
				        <div className='field'>
                            <input 
                                type='submit'
                                className='button blue standart'
                                />
                        </div>
                    </div>
                </form>
			</div>
		);
	}
}