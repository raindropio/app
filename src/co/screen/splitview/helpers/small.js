import s from './small.module.styl'
import React from 'react'

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
        if (this._resizeObserver){
            if (this._r)
                this._resizeObserver.unobserve(this._r)
            this._resizeObserver.disconnect()
        }
    }

    onResize = ([div])=>{
        const { width } = div.contentRect
        const small = width < this.props.minWidth
        
        if (small != this.state.small)
            window.requestAnimationFrame(() => {
                this.setState({ small })
            })
    }

    render() {
        const { small } = this.state
        const { className='', minWidth, ...etc } = this.props

        return (
            <div 
                ref={this.ref} 
                data-small={small}
                className={s.small+' '+className}
                { ...etc }></div>
        )
    }
}