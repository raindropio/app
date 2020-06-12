import React from 'react'

const mainStyle = {width: '100%', height: '100%', overflowY: 'overlay'}

export default (Component)=>
    class WithContainer extends React.Component {
        static defaultProps = {
            width: 0,
            height: 0,
            className: '',
            disableVirtualization: false,
        }
        
        bindContainer = r => {
            if (!r) return
            
            this._container = r

            const style = getComputedStyle(r, null)
            const paddingHorizontal = parseInt(style.getPropertyValue('padding-left')) + parseInt(style.getPropertyValue('padding-right'))
            const paddingVertical = parseInt(style.getPropertyValue('padding-top')) + parseInt(style.getPropertyValue('padding-bottom'))

            this.setState({ paddingHorizontal, paddingVertical })
        }

        state = {
            scrollTop: 0,
            isScrolling: false
        }

        onScroll = (e)=>{
            this.setState({ scrollTop: e.target.scrollTop, isScrolling: true }, ()=>{
                clearTimeout(this._scrollStop)
                this._scrollStop = setTimeout(() => {
                    this.setState({ isScrolling: false })
                }, 100)
            })
        }

        render() {
            const { width=0, height=0, disableVirtualization, className, ...etc } = this.props
            const { paddingHorizontal=0, paddingVertical=0 } = this.state

            return (
                <div 
                    style={disableVirtualization ? undefined : mainStyle}
                    ref={this.bindContainer}
                    onScroll={this.onScroll}
                    className={className}>
                    <Component 
                        {...etc}
                        {...this.state}
                        width={Math.max(width-paddingHorizontal, 0)}
                        height={Math.max(height-paddingVertical,0)} />
                </div>
            )
        }
    }