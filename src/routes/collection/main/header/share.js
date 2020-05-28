import React from 'react'
import Icon from '~co/common/icon'
import Sharing from '~co/collections/sharing'

export default class HeaderShare extends React.Component {
    state = {
        show: false
    }

    onSharingClick = ()=>
        this.setState({ show: true })

    onSharingClose = ()=>
        this.setState({ show: false })
    
    render() {
        const { cid } = this.props
        const { show } = this.state

        if (cid <= 0) return null

        return (
            <>
                <a 
                    className='button default'
                    onClick={this.onSharingClick}>
                    <Icon name='share' />
                </a>

                {show ? (
                    <Sharing 
                        _id={cid}
                        onClose={this.onSharingClose} />
                ) : null}
            </>
        )
    }
}