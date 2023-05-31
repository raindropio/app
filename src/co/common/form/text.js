import s from './text.module.styl'
import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'

const emptyObj = {}
const getRowsProps = (min, max)=>({
    async: false,
    ...(min ? {
        'data-min-rows': min,
    } : {}),
    ...(max ? {
        'data-max-rows': max,
    } : {}),
    style: {
        ...(min ? {'--min-rows': min}:{}),
        ...(max ? {'--max-rows': max}:{})
    }
})

class TextInner extends React.Component {
    static defaultProps = {
        className: '',
        autoSize: undefined,
        multiline: undefined,
        selectAll: undefined,
        variant: 'default',     //less, inline
        font: 'default',        //title

        children: null,         //after input
        icon: null
    }

    onKeyDownField = (e)=>{
        if (e.keyCode == 13 && 
            this.props.autoSize &&
            (
                !this.props.multiline ||
                e.metaKey || e.ctrlKey || e.shiftKey
            )){
            e.preventDefault()

            const form = e.currentTarget.closest('form')
            if (form) form.requestSubmit()
        }

        this.props.onKeyDown && this.props.onKeyDown(e)
    }

    onFocus = (e)=>{
        const { onFocus, readOnly=false } = this.props

        if (readOnly)
            e.currentTarget.select()

        if (!this._firstFocus && e.currentTarget.value){
            this._firstFocus = true

            if (this.props.selectAll)
                e.currentTarget.select()
            else if (e.currentTarget.setSelectionRange && e.currentTarget.type!='email')
                e.currentTarget.setSelectionRange(e.currentTarget.value.length, -1)
        }

        onFocus && onFocus(e)
    }

    onContainerClick = (e)=>
        e.currentTarget.querySelector(`.${s.text}`).focus()

    render() {
        const { className='', autoSize, variant, font, multiline, selectAll, hidden, icon, children, forwardedRef, minRows, maxRows, ...etc } = this.props
        const Component = autoSize ? TextareaAutosize : 'input'

        return (
            <div 
                className={s.wrap+' '+className}
                data-variant={variant}
                data-auto-size={autoSize}
                data-multiline={multiline}
                data-select-all={selectAll}
                data-font={font}
                data-disabled={etc.disabled}
                data-readonly={etc.readOnly}
                hidden={hidden}
                onClick={this.onContainerClick}>
                {icon ? <div className={s.icon}>{icon}</div> : null}

                <Component 
                    type='text'
                    tabIndex='0'
                    {...etc}
                    ref={forwardedRef}
                    className={s.text}

                    {...((minRows || maxRows) ? getRowsProps(minRows, maxRows) : emptyObj)} //react-autosize-textarea built-in maxRows buggy, content jumping

                    onKeyDown={this.onKeyDownField}
                    onFocus={this.onFocus} />

                {children}
            </div>
        )
    }
}

export const Text = React.forwardRef((props, ref) => {
    return <TextInner {...props} forwardedRef={ref} />
})