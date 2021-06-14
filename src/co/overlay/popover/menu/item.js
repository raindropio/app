import s from './item.module.styl'
import React from 'react'
import { Link } from 'react-router-dom'

import { Item } from '~co/common/list'
import Context from '../context'

export class MenuItem extends React.Component {
    static contextType = Context

    onClick = (e)=>{
        if ((this.props.href || this.props.to) == false)
            e.preventDefault()

        this.props.onClick && this.props.onClick(e)

        this.context.close()
    }

    render() {
        const { children, className='', as='a', ...etc } = this.props
        const Tag = etc.to ? Link : as
        
        return (
            <Item
                as={Tag} 
                tabIndex='0'
                {...etc}
                data-menu-item
                className={s.item+' '+className}
                onClick={this.onClick}>
                {children}
            </Item>
        )
    }
}