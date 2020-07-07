import s from './index.module.styl'
import React from 'react'
import Icon from '~co/common/icon'

class MultiSelectInner extends React.PureComponent {
    static defaultProps = {
        //...<input> specific
        icon: '',
        selected: [],
        onSelectedChange: undefined
    }

    state = {
        focused: false
    }

    onInputKeyDown = e => {
        const value = (e.target.value||'').trim()

        //remove
        if (e.key === 'Backspace' && !value){
            e.preventDefault()
            this.props.onSelectedChange(this.props.selected.slice(0, -1))
        }
        //add
        else if (e.key === 'Enter' && value){
            if (!this.props.selected.includes(value)){
                e.preventDefault()
                this.props.onSelectedChange([...this.props.selected, value])
            }
            e.target.value = ''
            this.props.onChange && this.props.onChange(e)
        }
        //default
        else if (this.props.onKeyDown)
            this.props.onKeyDown(e)
    }

    onInputFocus = e => {
        this.setState({ focused: true })
        this.props.onFocus && this.props.onFocus(e)
    }

    onInputBlur = e => {
        if (this._preventBlur) return
        this.setState({ focused: false })
        this.props.onBlur && this.props.onBlur(e)
    }

    onContainerClick = e => {
        e.currentTarget.querySelector('input').focus()
    }

    TokenMouseDown = () => {
        this._preventBlur = true
    }

    onTokenClick = e => {
        this._preventBlur = false
        const token = e.currentTarget.getAttribute('data-token')
        
        this.props.onSelectedChange(
            this.props.selected.filter(item=>item != token)
        )
    }

    render() {
        const { selected, forwardedRef, className='', onSelectedChange, icon, ...etc } = this.props
        const { focused } = this.state

        return (
            <div 
                className={s.multi}
                data-focused={focused}
                data-disabled={etc.disabled}
                onClick={this.onContainerClick}>
                {selected.map(item=>
                    <div 
                        key={item}
                        className={s.token}
                        data-token={item}
                        onMouseDown={this.TokenMouseDown}
                        onClick={this.onTokenClick}>
                        <div className={s.content}>
                            {icon && <Icon name={icon} size='micro' />}
                            <div className={s.title}>{item}</div>
                        </div>
                    </div>
                )}
                
                <input 
                    className={s.input+' '+className}
                    type='text'
                    autoComplete='off'
                    {...etc}
                    value={etc.value||''}
                    ref={forwardedRef}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    onKeyDown={this.onInputKeyDown} />
            </div>
        )
    }
}

export const MultiSelect = React.forwardRef((props, ref) => {
    return <MultiSelectInner {...props} forwardedRef={ref} />
})