import s from './search.module.styl'
import React from 'react'

import { Text } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Preloader from '~co/common/preloader'

class FormSearch extends React.PureComponent {
    static defaultProps = {
        autoFocus: false,
        clearOnEscape: true,
        value: '',
        onReset: undefined
    }

    state = {
        focus: false
    }

    bindRef = (ref)=>{
        this._input = ref

        if (this.props.forwardedRef){
            if (typeof this.props.forwardedRef == 'function')
                this.props.forwardedRef(ref)
            else
                this.props.forwardedRef = {current: ref}
        }
    }

    componentDidMount() {
        if (this.props.autoFocus)
            this._input && this._input.value && this._input.select()

        window.addEventListener('keydown', this.onWindowKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onWindowKeyDown)
    }

    onCancelClick = ()=>{
        this.onReset()
        this._input.focus()
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
        this._input.value = ''
        this.props.onChange({ target: this._input })
        this.props.onReset && this.props.onReset()
    }

    onInputKeyDown = (e)=>{
        switch(e.key) {
            case 'Escape':
                if (this.props.clearOnEscape){
                    if (this.props.value){
                        e.stopPropagation()
                        this.onReset()
                    }
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

            if (document.activeElement != this._input){
                e.preventDefault()
                this._input.focus()
            }
        }
    }

    render() {
        const { loading, forwardedRef, clearOnEscape, children, ...original } = this.props

        return (
            <div 
                data-active={this.state.focus}
                data-clear-on-escape={clearOnEscape}>
                <Text
                    ref={this.bindRef}
                    role='searchbox'
                    type='text'
                    spellCheck='false'
                    autoComplete='hidden'
                    autoCorrect='off'
                    inputMode='search'
                    className={s.input+' '+(original.value?s.filled:'')}
                    tabIndex='0'
                    {...original}
                    icon={loading ? <Preloader /> : <Icon name='search' />}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    onKeyDown={this.onInputKeyDown}>
                    {children}
                    {this.props.value && (
                        <Button 
                            size='small'
                            onClick={this.onCancelClick}>
                            <Icon name='close' size='micro' />
                        </Button>
                    )}
                </Text>
            </div>
        )
    }
}

export const Search = React.forwardRef((props, ref) => {
    return <FormSearch {...props} forwardedRef={ref} />
})