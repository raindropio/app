import React from 'react'
import { connect } from 'react-redux'
import { user } from '~data/selectors/user'

import Button from '~co/common/button'
import Avatar from '~co/common/avatar'
import Contextmenu from './menu'
import Icon from '~co/common/icon'

class UserProfileButton extends React.PureComponent {
    static defaultProps = {
        children: undefined //render function(user)
    }

    state = {
        menu: false
    }

    pin = React.createRef()

    onProfileClick = (e)=>{
        e.preventDefault()
        this.setState({menu: true})
    }

    onProfileClose = ()=>
        this.setState({menu: false})

    render() {
        const { user, children, dispatch, ...etc } = this.props
        const { menu } = this.state

        return (
            <>
                <Button 
                    {...etc}
                    ref={this.pin}
                    onClick={this.onProfileClick}>
                    <Avatar src={user.email_MD5} size='40' />
                    {children && children(user)}
                    <Icon name='arrow' size='micro' />
                </Button>
                
                {menu && <Contextmenu pin={this.pin} onClose={this.onProfileClose} />}
            </>
        )
    }
}

export default connect(
	(state)=>({
        user: user(state)
	})
)(UserProfileButton)