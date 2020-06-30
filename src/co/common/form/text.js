import s from './text.module.styl'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Icon from '~co/common/icon'

class TextInner extends React.Component {
    static defaultProps = {
        className: '',
        autoSize: undefined,
        multiline: undefined,
        variant: 'default',     //less
        font: 'default',        //title

        children: null,         //after input
        icon: null
    }

    state = {
        focus: false
    }

    inner = React.createRef()

    onKeyDownField = (e)=>{
        if (e.keyCode == 13 && 
            this.props.autoSize &&
            (
                !this.props.multiline ||
                e.metaKey || e.ctrlKey || e.shiftKey
            )){
            e.preventDefault()
        }

        this.props.onKeyDown && this.props.onKeyDown(e)
    }

    onFocus = (e)=>{
        const { onFocus, readOnly=false } = this.props

        if (readOnly)
            e.currentTarget.select()

        this.setState({ focus: true })
        onFocus && onFocus(e)
    }

    onBlur = (e)=>{
        this.setState({ focus: false })
        this.props.onBlur && this.props.onBlur(e)
    }

    onContainerClick = (e)=>
        e.currentTarget.querySelector(`.${s.text}`).focus()

    render() {
        const { className='', autoSize, variant, font, multiline, hidden, icon, children, forwardedRef, ...etc } = this.props
        const { focus } = this.state
        const Component = autoSize ? TextareaAutosize : 'input'

        return (
            <div 
                className={s.wrap+' '+className}
                data-variant={variant}
                data-auto-size={autoSize}
                data-multiline={multiline}
                data-font={font}
                data-focus={focus}
                hidden={hidden}
                onClick={this.onContainerClick}>
                {icon ? <div className={s.icon}>{icon}</div> : null}

                <Component 
                    type='text'
                    {...etc}
                    ref={forwardedRef}
                    className={s.text}

                    onKeyDown={this.onKeyDownField}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur} />

                {children}
            </div>
        )
    }
}

export const Text = React.forwardRef((props, ref) => {
    return <TextInner {...props} forwardedRef={ref} />
})