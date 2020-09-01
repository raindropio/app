import s from './index.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { logout } from '~data/actions/user'
import { user } from '~data/selectors/user'

import Button from '~co/common/button'
import Avatar from '~co/common/avatar'
import Contextmenu from './contextmenu'

class SidebarProfile extends React.PureComponent {
    state = {
        menu: false
    }

    pin = React.createRef()

    onProfileClick = (e)=>{
        e.preventDefault()
        this.setState({menu: true})
    }

    handlers = {
        onLogoutClick: ()=>
            this.props.logout(),

        onMenuClose: ()=>
            this.setState({menu: false})
    }

    render() {
        const { user } = this.props
        const { menu } = this.state

        return (
            <>
                <Button 
                    ref={this.pin} 
                    id={s.button}
                    onClick={this.onProfileClick}>
                    <Avatar src={user.email_MD5} size='40' />
                    <span>{user.fullName}</span>
                </Button>
                
                {menu && <Contextmenu pin={this.pin} {...this.props} {...this.handlers} />}
            </>
        )
    }
}

export default connect(
	(state)=>({
        user: user(state)
	}),
	{ logout }
)(SidebarProfile)