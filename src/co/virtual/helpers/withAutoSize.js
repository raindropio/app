import React from 'react'
import _ from 'lodash'

export default (Component)=>
    class VirtualGridAutoSize extends React.Component {
        state = {
            width: 0,
            height: 0,
            scrollTop: 0,
            isScrolling: false
        }

        bindRef = ref => {
            if (!ref || this._div == ref) return

            this._div = ref
            this._resizeObserver = new ResizeObserver(this.onResize)
            this._resizeObserver.observe(this._div)
        }

        componentWillUnmount() {
            if (this._resizeObserver){
                if (this._div)
                    this._resizeObserver.unobserve(this._div)
                this._resizeObserver.disconnect()
            }
        }

        onResize = ([div])=>{
            const { width, height } = div.contentRect
            this.computeSize(width, height)
        }

        onScroll = ()=>{
            if (this._scroll) return

            clearTimeout(this._isScrolling)

            this._scroll = window.requestAnimationFrame(() => {
                this.setState({ scrollTop: this._div.scrollTop, isScrolling: true })

                clearTimeout(this._isScrolling)
                this._isScrolling = setTimeout(() => {
                    this.setState({ isScrolling: false })
                }, 1000 / 6)

                this._scroll = 0
            })
        }

        computeSize = _.debounce((width, height)=>{
            if (width != this.state.width ||
                height != this.state.height)
                this.setState({ width, height })
        }, 50)

        render() {
            const { className, style, ...props } = this.props
            const { width } = this.state

            return (
                <div 
                    ref={this.bindRef}
                    className={className}
                    style={style}
                    onScroll={this.onScroll}>
                    {width ? <Component {...props} {...this.state} /> : null}
                </div>
            )
        }
    }