import s from './input.module.styl'
import React from 'react'

import { Text } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

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

        window.addEventListener('keydown', this.onWindowKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onWindowKeyDown)
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

    onWindowKeyDown = (e)=>{
        if (e.key == 'f' && (e.ctrlKey || e.metaKey)){
            e.stopPropagation()

            if (document.activeElement != this._input.current){
                e.preventDefault()
                this._input.current.focus()
            }
        }
    }

    renderButton = ({id, icon, iconSize='micro'})=>(
        <Button href='' data-id={id} key={id} tabIndex='-1' onClick={this.onButtonClick}>
            <Icon name={icon} size={iconSize} />
        </Button>
    )

    renderCancel = ()=>this.props.value && this.renderButton({
        id: 'reset',
        icon: 'close'
    })

    render() {
        const { loading, ...original } = this.props

        return (
            <div data-active={this.state.focus}>
                <form onSubmit={this.onSubmit}>
                    <Text
                        ref={this._input}
                        type='text'
                        spellCheck='false'
                        className={s.input+' '+(original.value?s.filled:'')}
                        {...original}
                        icon={loading ? <Preloader /> : <Icon name='search' />}
                        onChange={this.onInputChange}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                        onKeyDown={this.onInputKeyDown}>
                        {this.renderCancel()}
                    </Text>
                </form>
            </div>
        )
    }
}