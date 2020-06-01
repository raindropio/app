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

    onCreateItem = item=>
        this.props.onReader({ bookmark: item._id, tab: 'edit' })
    
    render() {
        const { spaceId } = this.props
        const { show } = this.state

        if (spaceId == -99) return null

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
                        spaceId={spaceId}
                        onCreateItem={this.onCreateItem}
                        onClose={this.onAddClose} />
                ) : null}
            </>
        )
    }
}