import React from 'react'
import Context from '../context'

export class MenuItem extends React.Component {
    static contextType = Context

    onClick = (e)=>{
        if (!this.props.href && !this.props.to)
            e.preventDefault()

        this.props.onClick && this.props.onClick(e)

        this.context.close()
    }

    render() {
        const { children, ...link } = this.props
        
        return (
            <a 
                {...link}
                className='contextMenuItem'
                onClick={this.onClick}>
                <span className='title'>{children}</span>
            </a>
        )
    }
}