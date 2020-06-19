import React from 'react'
import t from '~t'
import Icon from '~co/common/icon'
import Add from '~co/bookmarks/add'

export default class HeaderAdd extends React.Component {
    state = {
        show: false
    }

    pin = React.createRef()

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
                    ref={this.pin}
                    className='button active'
                    onClick={this.onAddClick}>
                    <b>
                        <Icon name='add' />
                        <span className='hide-on-small-body'>{t.s('add')}</span>
                    </b>
                </a>

                {show ? (
                    <Add 
                        pin={this.pin}
                        spaceId={spaceId}
                        onCreateItem={this.onCreateItem}
                        onClose={this.onAddClose} />
                ) : null}
            </>
        )
    }
}