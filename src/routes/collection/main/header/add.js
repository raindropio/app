import React from 'react'
import t from '~t'

import Button from '~co/common/button'
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
        this.props.history.push(
            this.props.getLink({
                bookmark: item._id,
                tab: 'edit'
            })
        )
    
    render() {
        const { _id, access } = this.props
        const { show } = this.state

        if (_id == -99 || access.level < 3) return null

        return (
            <>
                <Button 
                    ref={this.pin}
                    variant='primary'
                    title={t.s('add')}
                    onClick={this.onAddClick}>
                    <Icon name='add' />
                    <span className='hide-on-small-body'>{t.s('add')}</span>
                </Button>

                {show ? (
                    <Add 
                        pin={this.pin}
                        spaceId={_id}
                        onCreateItem={this.onCreateItem}
                        onClose={this.onAddClose} />
                ) : null}
            </>
        )
    }
}