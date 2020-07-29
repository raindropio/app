import s from './input.module.styl'
import React from 'react'
import t from '~t'

import { Text } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

class SearchInput extends React.PureComponent {
    static defaultProps = {
        autoFocus: false,
        clearOnEscape: true,
        value: '',
        onSubmit: undefined,
        onReset: undefined
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

    onCancelClick = ()=>{
        this.onReset()
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
        this.props.onReset && this.props.onReset()
    }

    onInputKeyDown = (e)=>{
        switch(e.key) {
            case 'Escape':
                if (this.props.clearOnEscape){
                    e.stopPropagation()

                    if (this.props.value)
                        this.onReset()
                    else
                        e.target.blur()
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

    render() {
        const { loading, forwardedRef, clearOnEscape, ...original } = this.props

        if (forwardedRef)
            this._input = forwardedRef

        return (
            <div 
                data-active={this.state.focus}
                data-clear-on-escape={clearOnEscape}>
                <form onSubmit={this.onSubmit}>
                    <Text
                        ref={this._input}
                        type='text'
                        spellCheck='false'
                        autoComplete='hidden'
                        autoCorrect='off'
                        inputMode='search'
                        className={s.input+' '+(original.value?s.filled:'')}
                        {...original}
                        icon={loading ? <Preloader /> : <Icon name='search' />}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                        onKeyDown={this.onInputKeyDown}>
                        {this.props.value && (
                            <Button 
                                onClick={this.onCancelClick}>
                                <Icon name='close' size='micro' />
                            </Button>
                        )}
                    </Text>
                </form>
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => {
    return <SearchInput {...props} forwardedRef={ref} />
})