import s from './text.module.styl'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export class Text extends React.Component {
    static defaultProps = {
        className: '',
        autoSize: false,
        multiline: false,
        variant: 'default',     //less
        font: 'default',        //title

        children: null,         //after input
        leftChildren: null      //before input
    }

    state = {
        focus: false
    }

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
        this.setState({ focus: true })
        this.props.onFocus && this.props.onFocus(e)
    }

    onBlur = (e)=>{
        this.setState({ focus: false })
        this.props.onBlur && this.props.onBlur(e)
    }

    render() {
        const { className='', autoSize, variant, font, multiline, leftChildren, children, ...etc } = this.props
        const { focus } = this.state
        const Component = autoSize ? TextareaAutosize : 'input'

        return (
            <div 
                className={s.wrap+' '+className}
                data-variant={variant}
                data-multiline={multiline}
                data-font={font}
                data-focus={focus}>
                {leftChildren}

                <Component 
                    type='text'
                    {...etc}
                    className={s.text}

                    onKeyDown={this.onKeyDownField}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur} />

                {children}
            </div>
        )
    }
}