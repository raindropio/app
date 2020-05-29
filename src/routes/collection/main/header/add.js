import React from 'react'
import Icon from '~co/common/icon'
import Add from '~co/bookmarks/add'

export default class HeaderAdd extends React.Component {
    state = {
        show: false
    }

    onAddClick = (e)=>{
        e.preventDefault()
        this.setState({ show: true })
    }

    onAddClose = ()=>
        this.setState({ show: false })
    
    render() {
        const { cid } = this.props
        const { show } = this.state

        if (cid == -99) return null

        return (
            <>
                <a 
                    href=''
                    className='button active'
                    onClick={this.onAddClick}>
                    <b>
                        <Icon name='add' />
                    </b>
                </a>

                {show ? (
                    <Add 
                        cid={cid}
                        onClose={this.onAddClose} />
                ) : null}
            </>
        )
    }
}