import s from './item.module.styl'
import React from 'react'

function ItemInner({ as='div', className='', active, color, focusable, style={}, forwardedRef, ...etc }) {
    const Component = as
    return (
        <Component 
            role='listitem'
            {...etc}
            ref={forwardedRef}
            className={`${className} ${s.item} ${active && s.active} ${focusable && s.focusable}`}
            style={{'--accent-color': color, ...style}} />
    )
}

export const Item = React.forwardRef((props, ref) => {
    return <ItemInner {...props} forwardedRef={ref} />
})

export function ItemIcon({ className='', ...etc }) {
    return (
        <div {...etc} className={s.icon+' '+className} />
    )
}

export function ItemTitle({ className='', ...etc }) {
    return (
        <div {...etc} className={s.title+' '+className} />
    )
}

export function ItemInfo({ className='', ...etc }) {
    return (
        <div {...etc} className={s.info+' '+className} />
    )
}

export function ItemActions({ className='', ...etc }) {
    return (
        <div {...etc} className={s.actions+' '+className} />
    )
}

export function ItemLink({ as='a', className='', ...etc }) {
    const Component = as
    return (
        <Component {...etc} className={s.link+' '+className} />
    )
}

export class ItemHeightCallback extends React.Component {
    state = {
        height: 0
    }
    
    bindRef = r => {
        if (r == null || this._ref == r) return null
        this._ref = r
        this.setState({ height: r.offsetHeight })
    }

    render() {
        const { height } = this.state

        if (!height)
            return (<Item ref={this.bindRef} />)

        return this.props.children(height)
    }
}