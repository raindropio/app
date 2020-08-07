import React from 'react'

const mainStyle = { width: '100%', height: '100%', flex: 1, minHeight: 0 }
const cache = {}

export default (Component, cacheId='')=>{
    class VirtualGridAutoSize extends React.Component {
        state = cache[cacheId] || { width: 0, height: 0 }

        bindRef = ref => {
            if (!ref || this._div == ref) return

            this._div = ref
            if (typeof ResizeObserver != 'undefined'){
                this._resizeObserver = new ResizeObserver(this.onResize)
                this._resizeObserver.observe(this._div)
            }
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

        computeSize = (width, height)=>{
            //window.requestAnimationFrame(() => {
                if (width != this.state.width ||
                    height != this.state.height){
                    cache[cacheId] = { width, height }
                    this.setState(cache[cacheId])
                }
            //})
        }

        render() {
            const { width } = this.state
            const { forwardedRef, ...etc } = this.props

            return (
                <div 
                    ref={this.bindRef}
                    style={mainStyle}>
                    {width ? (
                        <Component 
                            {...etc}
                            {...this.state}
                            ref={forwardedRef}
                            containerRef={this._div} />
                    ) : null}
                </div>
            )
        }
    }

    return React.forwardRef((props, ref) => {
        return <VirtualGridAutoSize {...props} forwardedRef={ref} />
    })
}