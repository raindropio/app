import React from 'react'
import t from '~t'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Sharing from '~co/collections/sharing'

export default class HeaderShare extends React.Component {
    state = {
        show: false
    }

    pin = React.createRef()

    onSharingClick = (e)=>{
        e.preventDefault()
        this.setState({ show: true })
    }

    onSharingClose = ()=>
        this.setState({ show: false })
    
    render() {
        const { _id } = this.props
        const { show } = this.state

        if (_id <= 0) return null

        return (
            <>
                <Button ref={this.pin} title={t.s('share')} onClick={this.onSharingClick}>
                    <Icon name='share' />
                    <span className='hide-on-small-body'>{t.s('share')}</span>
                </Button>

                {show ? (
                    <Sharing 
                        pin={this.pin}
                        _id={id}
                        onClose={this.onSharingClose} />
                ) : null}
            </>
        )
    }
}