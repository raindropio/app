import s from './small.module.styl'
import React from 'react'
import { ResizeObserver } from '~modules/browser'

export default class SmallDetector extends React.Component {
    static defaultProps = {
        minWidth: 0
    }

    state = {
        small: false
    }

    ref = (r)=>{
        if (!r || r == this._r) return

        this._r = r
        this._resizeObserver = new ResizeObserver(this.onResize)
        this._resizeObserver.observe(this._r)
    }

    componentWillUnmount() {
        if (this._r && this._resizeObserver)
            this._resizeObserver.unobserve(this._r)
            
        if (this._resizeObserver && this._resizeObserver.disconnect)
            this._resizeObserver.disconnect()
    }

    onResize = ([div])=>{
        const { width } = div.contentRect
        const small = width < this.props.minWidth
        
        if (small != this.state.small)
            this.setState({ small })
    }

    render() {
        const { small } = this.state
        const { className='', minWidth, as='div', ...etc } = this.props
        const Component = as

        return (
            <Component 
                ref={this.ref} 
                data-small={small}
                className={s.small+' '+className}
                { ...etc }></Component>
        )
    }
}