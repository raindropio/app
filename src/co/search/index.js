import React from 'react'
import Input from './input'

export default class Search extends React.Component {
    handlers = {
        onChange: ()=>{

        }
    }

    render() {
        return (
            <div className='search'>
                <Input 
                    {...this.props}
                    {...this.handlers} />
            </div>
        )
    }
}