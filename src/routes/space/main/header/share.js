import React from 'react'
import t from '~t'
import Icon from '~co/common/icon'
import Sharing from '~co/collections/sharing'

export default class HeaderShare extends React.Component {
    state = {
        show: false
    }

    onSharingClick = (e)=>{
        e.preventDefault()
        this.setState({ show: true })
    }

    onSharingClose = ()=>
        this.setState({ show: false })
    
    render() {
        const { spaceId } = this.props
        const { show } = this.state

        if (spaceId <= 0) return null

        return (
            <>
                <a 
                    href=''
                    className='button default'
                    onClick={this.onSharingClick}>
                    <Icon name='share' />
                    <span className='hide-on-small-body'>{t.s('share')}</span>
                </a>

                {show ? (
                    <Sharing 
                        _id={spaceId}
                        onClose={this.onSharingClose} />
                ) : null}
            </>
        )
    }
}