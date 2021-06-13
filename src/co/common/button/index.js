import s from './index.module.styl'
import React from 'react'

class ButtonInner extends React.PureComponent {
    static defaultProps = {
        variant:    'default',  //link, primary, active, outline, flat
        accent:     'default',  //danger
        size:       'default'   //small
    }

    onKeyDown = e => {
        if (e.key == 'Enter' && 
            e.currentTarget.getAttribute('disabled')==null){
            e.preventDefault()
            e.stopPropagation()
            e.currentTarget.click()
        }
        else
            this.props.onKeyDown && this.props.onKeyDown(e)
    }

    render() {
        const { as='div', className='', variant, accent, size, forwardedRef, ...etc } = this.props
        const Component = etc.href ? 'a' : as

        return (
            <Component 
                role='button'
                tabIndex={etc.disabled ? '-1' : '0'}
                ref={forwardedRef}
                className={s.button+' '+className}
                data-variant={variant||'default'}
                data-accent={accent||'default'}
                data-size={size||'default'}
                {...etc}
                onKeyDown={this.onKeyDown} />
        )
    }
}

export default React.forwardRef((props, ref) => {
    return <ButtonInner {...props} forwardedRef={ref} />
})

export const ButtonsGroup = React.forwardRef(
    function({ className='', ...etc }, ref) {
        return (
            <div 
                {...etc}
                className={s.group+' '+className}
                ref={ref} />
        )
    }
)