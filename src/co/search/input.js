import s from './input.module.styl'
import React from 'react'

import { Text } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

class SearchInput extends React.PureComponent {
    static defaultProps = {
        autoFocus: false,
        value: '',
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

    onInputFocus = (e)=>{
        this.setState({focus: true})
        this.props.onFocus && this.props.onFocus(e)
    }

    onInputBlur = (e)=>{
        this.setState({focus: false})
        this.props.onBlur && this.props.onBlur(e)
    }
    
    onReset = ()=>{
        this._input.current.value = ''
        this.props.onChange({ target: this._input.current })
    }

    onInputKeyDown = (e)=>{
        switch(e.key) {
            case 'Escape':
                if (this.props.value){
                    e.stopPropagation()
                    this.onReset()
                }
            break
        }

        this.props.onKeyDown && this.props.onKeyDown(e)
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
        const { loading, forwardedRef, ...original } = this.props

        if (forwardedRef)
            this._input = forwardedRef

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

export default React.forwardRef((props, ref) => {
    return <SearchInput {...props} forwardedRef={ref} />
})