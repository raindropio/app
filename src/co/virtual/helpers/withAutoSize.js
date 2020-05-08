import React from 'react'

const mainStyle = { width: '100%', height: '100%' }

export default (Component)=>
    class VirtualGridAutoSize extends React.PureComponent {
        state = {
            width: 0,
            height: 0
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

        computeSize = (width, height)=>{
            window.requestAnimationFrame(() => {
                if (width != this.state.width ||
                    height != this.state.height)
                    this.setState({ width, height })
            })
        }

        render() {
            const { width } = this.state

            return (
                <div 
                    ref={this.bindRef}
                    style={mainStyle}>
                    {width ? (
                        <Component 
                            {...this.props}
                            {...this.state}
                            containerRef={this._div} />
                    ) : null}
                </div>
            )
        }
    }