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

    onAddToken = e => {
        const value = (e.target.value||'').trim()
        if (!value) return

        if (!this.props.selected.includes(value)){
            e.preventDefault()
            this.props.onSelectedChange([...this.props.selected, value])
        }
        e.target.value = ''
        this.props.onChange && this.props.onChange(e)
    }

    onInputKeyDown = e => {
        const value = (e.target.value||'').trim()

        //remove
        if (e.key === 'Backspace' && !value)
            this.props.onSelectedChange(this.props.selected.slice(0, -1))
        
        //add on comma
        else if (e.key === ',' && value.length>1){
            e.target.value = e.target.value.replace(/,/gi, '')
            this.onAddToken(e)
        }

        //default
        this.props.onKeyDown && this.props.onKeyDown(e)
    }

    onInputKeyUp = e => {
        const value = (e.target.value||'').trim()

        //add, important to put it in KeyUp, to give time for parent component do something with Enter
        if (e.key === 'Enter' && value)
            this.onAddToken(e)

        this.props.onKeyUp && this.props.onKeyUp(e)
    }

    onInputBlur = e => {
        this.onAddToken(e)

        if (this._preventBlur) return
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

        return (
            <div 
                className={s.multi}
                data-disabled={etc.disabled}
                onClick={this.onContainerClick}>
                {(selected||[]).map(item=>
                    <div 
                        key={item}
                        className={s.token}
                        data-token={item}
                        onMouseDown={this.TokenMouseDown}
                        onClick={this.onTokenClick}>
                        <div className={s.content}>
                            {icon && (
                                <>
                                    <Icon className={s.icon} name={icon} size='micro' />
                                    <Icon className={s.close} name='close' size='micro' />
                                </>
                            )}
                            <div className={s.title}>{item}</div>
                        </div>
                    </div>
                )}
                
                <input 
                    className={s.input+' '+className}
                    type='text'
                    autoComplete='off'
                    spellCheck='false'
                    {...etc}
                    value={etc.value||''}
                    ref={forwardedRef}
                    onBlur={this.onInputBlur}
                    onKeyDown={this.onInputKeyDown} 
                    onKeyUp={this.onInputKeyUp}
                    />
            </div>
        )
    }
}

export const MultiSelect = React.forwardRef((props, ref) => {
    return <MultiSelectInner {...props} forwardedRef={ref} />
})