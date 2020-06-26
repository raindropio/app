import s from './withContainer.module.styl'
import React from 'react'

const cache = {}

export default (Component)=>
    class WithContainer extends React.Component {
        static defaultProps = {
            width: 0,
            height: 0,
            className: '',
            disableVirtualization: false,
        }
        
        bindContainer = r => {
            if (!r || cache[this.props.className]) return
            
            this._container = r

            const style = getComputedStyle(r, null)
            const paddingHorizontal = parseInt(style.getPropertyValue('padding-left')) + parseInt(style.getPropertyValue('padding-right'))
            const paddingVertical = parseInt(style.getPropertyValue('padding-top')) + parseInt(style.getPropertyValue('padding-bottom'))

            if (this.props.className)
                cache[this.props.className] = { paddingHorizontal, paddingVertical }

            this.setState({ paddingHorizontal, paddingVertical })
        }

        state = {
            scrollTop: 0,
            isScrolling: false,
            ...(cache[this.props.className]||{})
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
            const { width=0, height=0, disableVirtualization, className='', ...etc } = this.props
            const { paddingHorizontal=0, paddingVertical=0 } = this.state

            return (
                <div 
                    ref={this.bindContainer}
                    onScroll={this.onScroll}
                    className={className + ' ' + (!disableVirtualization ? s.scrollable : '')}>
                    <Component 
                        {...etc}
                        {...this.state}
                        width={Math.max(width-paddingHorizontal, 0)}
                        height={Math.max(height-paddingVertical,0)} />
                </div>
            )
        }
    }