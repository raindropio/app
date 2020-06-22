import s from './input.module.styl'
import React from 'react'
import Icon from '~icon'
import Preloader from '../common/preloader'

export default class SearchView extends React.PureComponent {
    static defaultProps = {
        autoFocus: false,
        value: '',
        onChange: undefined, //(val, callback)
        onSubmit: undefined,
    }

    state = {
        focus: false
    }

    _input = React.createRef()

    componentDidMount() {
        if (this.props.autoFocus)
            this._input.current && this._input.current.value && this._input.current.select()
    }

    onSubmit = (e)=>{
        e && e.preventDefault && e.preventDefault()
        this.props.onSubmit()
    }

    onButtonClick = (e)=>{
        e.preventDefault()

        const id = e.target.getAttribute('data-id')
        switch(id) {
            case 'reset':
                this.onReset()
            break
        }

        this._input.current.focus()
    }

    onInputChange = (e)=>this.props.onChange(e.target.value)
    onInputFocus = ()=>this.setState({focus: true})
    onInputBlur = ()=>this.setState({focus: false})
    onReset = ()=>this.props.onChange('', this.props.onSubmit)

    onInputKeyDown = (e)=>{
        switch(e.key) {
            case 'Escape':
                if (this.props.value){
                    e.stopPropagation()
                    this.onReset()
                }
            break
        }
    }

    renderButton = ({id, icon, iconSize='micro'})=>(
        <a className={s.button+' button'} href='' data-id={id} key={id} tabIndex='-1' onClick={this.onButtonClick}>
            <Icon name={icon} size={iconSize} />
        </a>
    )

    renderCancel = ()=>this.props.value && this.renderButton({
        id: 'reset',
        icon: 'close'
    })

    render() {
        const { loading, ...original } = this.props

        return (
            <div className={s.input} data-active={this.state.focus}>
                <form onSubmit={this.onSubmit}>
                    <span className={s.icon}>
                        {loading ? <Preloader data-size='small' /> : <Icon name='search' className={s.magnifier} />}
                    </span>
    
                    <input
                        ref={this._input}
                        type='text'
                        spellCheck='false'
                        {...original}
                        onChange={this.onInputChange}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                        onKeyDown={this.onInputKeyDown} />

                    {this.renderCancel()}
                </form>
            </div>
        )
    }
}