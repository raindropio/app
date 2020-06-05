import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '~co/common/icon'
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
        const { children, checked=false, ...etc } = this.props
        const Component = etc.to ? Link : 'a'
        
        return (
            <Component 
                {...etc}
                className='contextMenuItem'
                onClick={this.onClick}>
                <span className='itemContent'>
                    {children}
                </span>
                

                {checked ? (
                    <Icon 
                        name='check_active'
                        className='itemCheckedIcon' />
                ) : null}
            </Component>
        )
    }
}