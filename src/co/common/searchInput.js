import React from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'
import Icon from '~icon'
import Preloader from './preloader'

export default class CommonSearchInput extends React.PureComponent {
    constructor(props) {
        super(props)
        
        this.state = {
            value: props.value,
            focus: false,
            filled: false
        }
    }

    _bindInput = (r)=>this._input=r

    componentDidMount() {
        this._input && this._input.select()
    }

    onChange = ({target})=>
        this.setState({ value: target.value }, this.onSearch)

    onSubmit = (e)=>{
        e.preventDefault()
        this.onSearch()
    }

    onSearch = _.debounce(()=>{
        const filled = this.state.value ? true : false
        if (this.state.filled != filled)
            this.setState({ filled })

        this.props.onChange(this.state.value)
    }, 500)

    onButtonClick = (e)=>{
        e.preventDefault()

        const id = e.target.getAttribute('data-id')
        switch(id) {
            case 'reset':
                this.setState({ value: '' }, this.onSearch)
            break
        }

        this.props.onButtonClick && this.props.onButtonClick(id)
        this._input.focus()
    }

    onFocus = ()=>this.setState({focus: true})
    onBlur = ()=>this.setState({focus: false})

    renderButton = ({id, icon, iconSize='micro'})=>(
        <a className='search-button button toolbar-button' href='' data-id={id} key={id} tabIndex="-1" onClick={this.onButtonClick}>
            <Icon name={icon} size={iconSize} />
        </a>
    )

    renderCancel = ()=>this.state.filled && this.renderButton({
        id: 'reset',
        icon: 'close'
    })

    renderCustomButtons = ()=>{
        const buttons = typeof this.props.buttons == 'function' ? this.props.buttons(this.state.filled) : this.props.buttons
  
        return Array.isArray(buttons) && buttons.map(this.renderButton)
    }

    render() {
        const { value, loading, count, onChange, onButtonClick, buttons=[], ...original } = this.props

        return (
            <div className='search-input' data-active={this.state.focus}>
                <form onSubmit={this.onSubmit}>
                    <span className='search-input-icon'>
                        {loading ? <Preloader className='size-small' /> : <Icon name='search' className='search-input-magnifier' />}
                    </span>
    
                    <input
                        ref={this._bindInput}
                        className='searchInput'
                        type='search'
                        spellCheck='false'
                        {...original}
                        value={this.state.value}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onChange={this.onChange} />

                    {(this.state.filled && count === 0) && (
                        <div className='search-input-nofound'>
                            0️⃣
                        </div>
                    )}

                    {this.renderCustomButtons()}
                    {this.renderCancel()}
                </form>
            </div>
        )
    }
}