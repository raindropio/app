import React from 'react'
import { Link } from 'react-router-dom'
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
        const { children, ...etc } = this.props
        const Component = etc.to ? Link : 'a'
        
        return (
            <Component 
                {...etc}
                className='contextMenuItem'
                onClick={this.onClick}>
                {children}
            </Component>
        )
    }
}