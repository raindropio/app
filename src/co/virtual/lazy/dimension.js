import React from 'react'
import { ResizeObserver } from '~modules/browser'
import { findDOMNode } from 'react-dom'
import { PropTypes } from 'prop-types'

class Dimension {
    constructor() {
        this._io = new ResizeObserver(this.onChange)
            
        this._targets = new Map()
    }

    onChange = (e)=>{
        for(const { target, contentRect } of e)
            if (this._targets.has(target))
                this._targets.get(target)(contentRect)
    }

    //public
    add = (target, callback)=>{
        if (!target) return
        if (this._targets.has(target)) return

        this._targets.set(target, callback)
        this._io.observe(target)
    }

    remove = (target)=>{
        if (!target) return
        this._targets.delete(target)
        this._io.unobserve(target)
    }
}
const DimensionInstance = new Dimension()

export default class LazyDimension extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    }

    componentDidMount() {
        if (this.props.disabled) return

        this._div = findDOMNode(this)
        DimensionInstance.add(this._div, this.props.onChange)
    }

    componentWillUnmount() {
        if (this._div)
            DimensionInstance.remove(this._div)
    }

    render() {
        return this.props.children
    }
}