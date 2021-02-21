import s from './item.module.css'
import React from 'react'
import { PropTypes } from 'prop-types'
import Visibility from './visibility'
import Dimension from './dimension'

export default class LazyItem extends React.PureComponent {
    static propTypes = {
        //public
        children: PropTypes.func.isRequired,
        item: PropTypes.any.isRequired,
        index: PropTypes.number.isRequired,
        alwayVisible: PropTypes.bool,
        scrollIntoView: PropTypes.bool,

        mode: PropTypes.oneOf(['height', 'row-end-span']),
        gridCellSize: PropTypes.number,

        //internal
        visibility: PropTypes.instanceOf(Visibility),
    }

    static defaultProps = {
        mode: 'height',
        alwayVisible: false,
        gridCellSize: 1,
        scrollIntoView: false
    }

    state = {
        //is it visible on initial render?
        visible: this.props.alwayVisible,
        measure: false,
        style: undefined
    }

    bindRef = ref=>{
        this._ref = ref

        if (!this.props.alwayVisible)
            this.props.visibility.add(ref, this.onChangeVisibilty)
    }

    onChangeVisibilty = (visible)=>{
        if (visible === this.state.visible) return
        if (!visible && this.props.mode == 'row-end-span') return //better performance but more ram use :(

        let style
        //measure height before hidding content (only in 'height' mode, and on second change of visibility)
        if (this.props.mode == 'height'){
            const height = !visible && this.state.measure && this._ref && this._ref.offsetHeight
            style = height ? {'--lazy-item-height': height+'px'} : undefined
        }

        this.setState({
            visible,
            measure: true,
            ...(style ? {style} : {})
        })
    }

    onChangeDimension = ({ height })=>{
        const gridRowEnd = `span ${Math.ceil(height/this.props.gridCellSize)}`

        if (!this.state.style ||
            !this.state.style.gridRowEnd != gridRowEnd)
            this.setState({ style: { gridRowEnd } })
    }

    scrollToMe = ()=>{
        cancelAnimationFrame(this._scrollReq)

        this._scrollReq = requestAnimationFrame(() => {
            if (!this._ref || !this.props.scrollIntoView) return

            const { y } = this._ref.getBoundingClientRect()
            if (y < 0 || y > window.innerHeight)
                this._ref.scrollIntoView()
        })
    }

    componentDidMount() {
        this.scrollToMe()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.scrollIntoView != this.props.scrollIntoView)
            this.scrollToMe()
    }

    componentWillUnmount() {
        this.props.visibility.remove(this._ref)
    }

    render() {
        const { children, item, index, mode } = this.props
        const { visible, style } = this.state

        return (
            <div 
                ref={this.bindRef}
                className={(s.item||'')+' '+s[mode]}
                style={style}>
                {!!visible && (
                    <Dimension
                        disabled={mode!='row-end-span'}
                        onChange={this.onChangeDimension}>
                        {children(item, index)}
                    </Dimension>
                )}
            </div>
        )
    }
}